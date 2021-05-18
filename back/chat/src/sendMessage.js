module.exports = async function sendMessage(broker, message) {
    const new_message = {
        message: message.message,
        username: message.username
    }

    console.log(message);
    const exchange = await broker.exchange(message.roomName + "-exchanger", {type: "fanout"}).assert()
    await exchange.pub("", new_message)
}
