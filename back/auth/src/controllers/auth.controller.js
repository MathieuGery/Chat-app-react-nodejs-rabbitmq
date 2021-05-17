'use strict'

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')
const mailSender = require('../services/sendgrid')
const bcrypt = require("bcrypt-nodejs");

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

exports.list = async  (req, res, next) => {
  try {
    const users = await User.listUsers()
    res.send(users)
  } catch (error) {
    return next()
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body)
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    mailSender.mailLogin(next, user.email)
    return res.json({ message: 'OK', token: token, username: user.name, email: user.email})
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

exports.recoverPasswordFinal = async (req, res, next) => {
  try {
    if (!req.query.key || !req.body.password) return res.status(httpStatus.BAD_REQUEST)
    const user = await User.findAndRecoverPasswordFinal({activationKey: req.query.key})
    const newPasswordHash = bcrypt.hashSync(req.body.password)
    await User.findOneAndUpdate(
        { 'activationKey': req.query.key },
        { $set: { 'password': newPasswordHash, 'activationKey': '' } }
    )
    mailSender.mailConfirmNewPassword(next, user.email)
    return res.json({ message: 'Your password has been successfully reset' })
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
