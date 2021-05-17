'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const { create } = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

router.post('/register', validator(create), authController.register)
router.post('/login', authController.login)
router.get('/confirm', authController.confirm)
router.post('/recover_password', authController.recoverPassword)
router.post('/recover_password_final', authController.recoverPasswordFinal)
router.get('/list', auth(), authController.list)

module.exports = router
