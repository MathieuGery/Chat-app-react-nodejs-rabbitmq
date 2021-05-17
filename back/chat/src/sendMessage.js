const mongoose = require('../mongoose');

module.exports = async function sendMessage(broker, message) {

    const new_message = {
        message: message.message,
        username: message.username
    }
    console.log(new_message)
    const exchange = await broker.exchange(message.roomName + "-exchanger", {type: "fanout"}).assert()
    mongoose.addNewMessages(new_message, message.roomName)
    await exchange.pub("", new_message)
}
