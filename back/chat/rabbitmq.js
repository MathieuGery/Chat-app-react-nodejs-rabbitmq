require('dotenv').config()
var amqp = require('amqplib/callback_api')

module.exports = function (cb) {
    amqp.connect(process.env.RABBITMQURI, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        cb(connection)
    });
}
