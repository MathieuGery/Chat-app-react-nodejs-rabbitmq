'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const Schema = mongoose.Schema
const userSchema = require('./user.model')

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

    async listAllRooms () {
        const rooms = await this.find({ }).exec()
        if (!rooms) throw new APIError(`No rooms associated with ${rooms}`, httpStatus.NOT_FOUND)

        return ({ rooms: rooms })
    },

    async findAndRecoverPassword (payload) {
        const { email } = payload
        if (!email) throw new APIError('Email must be provided for login')

        const user = await this.findOne({ email }).exec()
        if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)

        if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)

        return user
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
