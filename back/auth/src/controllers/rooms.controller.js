'use strict'

const Room = require('../models/room.model')

const httpStatus = require('http-status')


exports.create = async (req, res, next) => {
    try {
        const body = req.body
        const room = new Room(body)
        const savedUser = await room.save()
        res.status(httpStatus.CREATED)
        res.send(savedUser.transform())
    } catch (error) {
        return next(Room.checkDuplicateRoomError(error))
    }
}

exports.listRooms = async (req, res, next) => {
    try {
        const rooms = await Room.listAllRooms()
        res.send(rooms)
    } catch (error) {
        return next()
    }
}
