const mongoose = require('../mongoose');

module.exports = function sendMessage(exchange, message) {
    mongoose.addNewMessages(message, exchange.name)
    exchange.pub("", message)
}
