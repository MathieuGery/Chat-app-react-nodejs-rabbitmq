'use strict'

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')
const mailSender = require('../services/sendgrid')

exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1()
    const body = req.body
    body.activationKey = activationKey
    const user = new User(body)
    const savedUser = await user.save()
    res.status(httpStatus.CREATED)
    res.send(savedUser.transform())
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body)
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    mailSender.mailLogin(next, user.email)
    return res.json({ message: 'OK', token: token })
  } catch (error) {
    next(error)
  }
}

exports.confirm = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { 'activationKey': req.query.key },
      { 'active': true }
    )
    return res.json({ message: 'Account confirmed' })
  } catch (error) {
    next(error)
  }
}

exports.recoverPassword = async (req, res, next) => {
  try {
    const user = await User.findAndRecoverPassword(req.body)
    mailSender.mailRecover(next, user.email, user.activationKey)
    console.log(user.email)
    return res.json({ message: 'An email was sent to recover your password' })
  } catch (error) {
    next(error)
  }
}
