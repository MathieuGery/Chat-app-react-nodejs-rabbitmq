'use strict'

const Joi = require('joi')

// Room validation rules
module.exports = {
    create: {
        body: {
            creator: Joi.string().email().required(),
            name: Joi.string().max(128).required()
        }
    }
}
