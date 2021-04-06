'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const config = require('../config')
const sgMail = require('@sendgrid/mail')
const Schema = mongoose.Schema

const roles = [
  'user', 'admin'
]

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128
  },
  name: {
    type: String,
    maxlength: 50
  },
  activationKey: {
    type: String,
    unique: true
  },
  active: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'user',
    enum: roles
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function save (next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }

    this.password = bcrypt.hashSync(this.password)

    return next()
  } catch (error) {
    return next(error)
  }
})

userSchema.post('save', async function saved (doc, next) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: this.email, // Change to your recipient
      from: 'contact.brewdex@gery.me', // Change to your verified sender
      subject: 'BrewDex confirm account',
      text: 'Click here to activate',
      html: `<div><h1>Hello new user!</h1><p>Click <a href="${config.hostname}/api/auth/confirm?key=${this.activationKey}">link</a> to activate your new account.</p></div><div><h1>Hello developer!</h1><p>Feel free to change this template ;).</p></div>`
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    return next()
  } catch (error) {
    return next(error)
  }
})

userSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'name', 'email', 'createdAt', 'role']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  },

  passwordMatches (password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  roles,

  checkDuplicateEmailError (err) {
    if (err.code === 11000) {
      var error = new Error('Email already taken')
      error.errors = [{
        field: 'email',
        location: 'body',
        messages: ['Email already taken']
      }]
      error.status = httpStatus.CONFLICT
      return error
    }

    return err
  },

  async findAndGenerateToken (payload) {
    const { email, password } = payload
    if (!email) throw new APIError('Email must be provided for login')

    const user = await this.findOne({ email }).exec()
    if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)

    const passwordOK = await user.passwordMatches(password)

    if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED)

    if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)

    return user
  }
}

module.exports = mongoose.model('User', userSchema)
