'use strict'
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
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
    }
}, {
    timestamps: true
})

roomSchema.method({
    transform () {
        const transformed = {}
        const fields = ['creator', 'name', 'createdAt', 'members']

        fields.forEach((field) => {
            transformed[field] = this[field]
        })

        return transformed
    },
})

roomSchema.statics = {
    checkDuplicateRoomError (err) {
        if (err.code === 11000) {
            var error = new Error('Room already taken')
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

    async listAllRooms () {
        const rooms = await this.find({ }).exec()
        if (!rooms) throw new APIError(`No rooms associated with ${rooms}`, httpStatus.NOT_FOUND)

        return ({ rooms: rooms })
    },

    async editRoom (payload, roomName) {
        const { creator, name, members } = payload
        const update = { creator: creator, name: name, members: members}
        if (!name) throw new APIError('Room name must be provided')

        return await this.findOneAndUpdate({name: roomName}, {$set: update}, {upsert: true, new: true}, function (err, res) {
            const error = new Error('Room already taken')
            if (!res) {
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

    async findAndRecoverPasswordFinal (payload) {
        const { activationKey } = payload

        const user = await this.findOne({ activationKey }).exec()
        if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)

        if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)

        return user
    }
}

module.exports = mongoose.model('Room', roomSchema)
