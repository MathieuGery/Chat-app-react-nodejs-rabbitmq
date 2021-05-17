module.exports = async function joinRoom(broker, room, username) {
    console.log(room, username)
    // creates the exchange if it does not exist
    const exchange = await broker.exchange(room.roomName + "-exchanger", {type: "fanout"}).assert()

    // creates the queue if it does not exist
    const queue = await broker.queue(username + "-" + room.roomName + "-queue").assert()

    // bind the queue to the exchange (if it wasn't already done)
    await exchange.bind(queue)
}
