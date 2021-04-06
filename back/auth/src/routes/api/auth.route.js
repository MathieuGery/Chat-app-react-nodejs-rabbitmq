'use strict'

const axios = require('axios');
const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const { create } = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

router.post('/register', validator(create), authController.register) // validate and register
router.post('/login', authController.login) // login
router.get('/confirm', authController.confirm)

// Authentication example
router.post('/secret1', auth(), (req, res) => {

  if (!req.body.product_id) {
    res.status(400).json('No product id specified')
  }
  // example route for auth
  axios.get('https://world.openfoodfacts.org/api/v0/product/' + req.body.product_id)
    .then(function (response) {
      // handle success
      res.json({ message: response.data })
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
})
router.get('/secret2', auth(['admin']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only admin can access' })
})
router.get('/secret3', auth(['user']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only user can access' })
})

module.exports = router
