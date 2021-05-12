'use strict'

const express = require('express')
const router = express.Router()
const roomsController = require('../../controllers/rooms.controller')
const validator = require('express-validation')
const { create } = require('../../validations/rooms.validation')
const auth = require('../../middlewares/authorization')

router.get('/list', roomsController.listRooms)
router.post('/create', validator(create), roomsController.create)
router.post('/edit', roomsController.editRoom)

router.get('/cr', auth(), (req, res) => {
    res.status(400).json('Secret1 route')
})


module.exports = router
