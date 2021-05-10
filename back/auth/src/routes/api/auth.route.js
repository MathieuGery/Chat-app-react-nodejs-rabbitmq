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

router.get('/secret1', auth(), (req, res) => {
    res.status(400).json('Secret1 route')
})
router.get('/secret2', auth(['admin']), (req, res) => {
  res.json({ message: 'Only admin can access' })
})
router.get('/secret3', auth(['user']), (req, res) => {
  res.json({ message: 'Only user can access' })
})

module.exports = router
