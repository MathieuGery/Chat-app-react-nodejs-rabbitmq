const mongoose = require('../mongoose');

module.exports = async function getMessages(io, broker, username, room) {
    const exchange = await broker.exchange(room.roomName + "-exchanger", {type: "fanout"}).assert()
    const queue = await broker.queue(username + "-" + room.roomName + "-queue").assert()
    await exchange.bind(queue)

    const messageList = await mongoose.getRoomMessages(room.roomName);
    io.emit(
        'get-messages',
        messageList
    );
    queue.sub(async msg => {
        const messageContent = msg.content;
        if (username === messageContent.username) {
            await mongoose.addNewMessages(messageContent, room.roomName);
        }
        const messageList = await mongoose.getRoomMessages(room.roomName);
        io.emit(
            'get-messages',
            messageList
        );
    }).catch((e) => {
        console.error(e)
    })
    return username + "-" + room.roomName + "-queue";
}
