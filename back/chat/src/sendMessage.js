const mongoose = require('../mongoose');

module.exports = async function sendMessage(broker, message, username) {
    const new_message = {
        message: message.message,
        username: message.username
    }

    console.log(message);
    if (username === new_message.username) {
        await mongoose.addNewMessages(new_message, message.roomName);
    }
    const exchange = await broker.exchange(message.roomName + "-exchanger", {type: "fanout"}).assert()
    await exchange.pub("", new_message)
}
