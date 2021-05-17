'use strict'
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const mailSender = require('../services/sendgrid')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50
    },
    creator: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: false
    },
    messages: {
        type: Array,
        required: false
    }
}, {
    timestamps: true
})

roomSchema.method({
    transform () {
        const transformed = {}
        const fields = ['creator', 'name', 'createdAt', 'members', 'messages']

        fields.forEach((field) => {
            transformed[field] = this[field]
        })

        return transformed
    },
})

roomSchema.statics = {
    checkDuplicateRoomError (err) {
        if (err.code === 11000) {
            let error = new Error('Room already taken')
            error.errors = [{
                field: 'name',
                location: 'body',
                messages: ['Room already taken']
            }]
            error.status = httpStatus.CONFLICT
            return error
        }

        return err
    },

    checkRoomExist (err) {
        if (err.code === 11000) {
            const error = new Error('Room not found')
            error.errors = [{
                field: 'name',
                location: 'body',
                messages: ['Room not found']
            }]
            error.status = httpStatus.CONFLICT
            return error
        }

        return err
    },

    async listAllRooms (username) {
        let rooms = await this.find({"members.name":  username}).exec()
        const general = await this.find({"name": "general"}).exec()
        if (!rooms) throw new APIError(`No rooms associated with ${rooms}`, httpStatus.NOT_FOUND)
        rooms.push(general)

        return ({ rooms: rooms })
    },

    async sendInvites (payload, roomName) {
        let i = 0;
        if (!roomName) throw new APIError('Room name must be provided')

        const room = await this.findOne({ "name": roomName }).exec()
        if (room.members) {
            for (const member of room.members) {
                if (member.status === "pending") {
                    mailSender.mailRoomRequest("", member.name, room.creator, room.name)
                    room.members[i].status = "sent"
                    const update = {members: room.members}
                    await this.findOneAndUpdate({name: roomName}, {$set: update}, {upsert: true, new: true}, function (err, res) {})
                }
                i++;
            }
        }

    },

    async editRoom (payload, roomName) {
        const { creator, name, members} = payload
        const update = { creator: creator, name: name, members: members}

        for(let prop in update) if(!update[prop]) delete update[prop];
        if (!roomName) throw new APIError('Room name must be provided')

        return await this.findOneAndUpdate({name: roomName}, {$set: update}, {upsert: false, new: true}, function (err, res) {
            console.log(res)
            const error = new Error('Room already taken')
            if (!res) {
                console.log("toto")
                error.errors = [{
                    field: 'name',
                    location: 'body',
                    messages: ['Room already taken']
                }]
                error.status = httpStatus.CONFLICT
                return error
            }
            if (err) {
                error.errors = [{
                    field: 'name',
                    location: 'body',
                    messages: ['Room already taken']
                }]
                error.status = httpStatus.CONFLICT
                return error
            }
        })
    },
}

module.exports = mongoose.model('Room', roomSchema)
