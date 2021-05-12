'use strict'

const config = require('../config')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`)
  process.exit(1)
})

if (config.env === 'dev') {
  mongoose.set('debug', true)
}

exports.connect = () => {
  console.log("Env=", config.env)
  var mongoURI = (config.env === 'prod' || 'dev' ? config.mongo.uri : config.mongo.testURI)

  console.log(mongoURI);
  mongoose.connect(mongoURI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false);

  return mongoose.connection
}
