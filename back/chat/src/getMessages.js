const mongoose = require('../mongoose');

module.exports = async function getMessages(io, broker, username, room) {
    const queue = await broker.queue(username + "-" + room.newRoomName + "-queue").assert()
    const messageList = await mongoose.getRoomMessages(room.newRoomName);
    io.emit(
        'get-messages',
        messageList
    );
    const oldQueue = await broker.queue(username + "-" + room.currentRoomName + "-queue").assert();
    await oldQueue.cancel();
    queue.sub(async msg => {
        const messageContent = msg.content;
        const messageList = await mongoose.getRoomMessages(room.newRoomName);
        messageList.push(messageContent);
        io.emit(
            'get-messages',
            messageList
        );
        if (username === messageContent.username) {
            mongoose.addNewMessages(messageContent, room.newRoomName);
        }
    }).catch((e) => {
        console.error(e)
    })
}
