module.exports = async function joinRoom(broker, roomName, username) {
    console.log(roomName, username)
    // creates the exchange if it does not exist
    const exchange = await broker.exchange(roomName.roomName + "-exchanger", {type: "fanout"}).assert()

    // creates the queue if it does not exist
    const queue = await broker.queue(username + "-" + roomName.roomName + "-queue").assert()

    // bind the queue to the exchange (if it wasn't already done)
    await exchange.bind(queue)
}
