// Edit this file and rename as `connection.js`
var amqp = require('amqplib/callback_api')

module.exports = function (cb) {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        cb(connection)
    });
}
