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

exports.editRoom = async (req, res, next) => {
    try {
        if (!req.query.name) return res.status(httpStatus.BAD_REQUEST)
        const room = await Room.editRoom(req.body, req.query.name)
        res.send(room)
    } catch (error) {
        console.log(error)
        return next(Room.checkRoomExist(error))
    }
}
