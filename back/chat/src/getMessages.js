const mongoose = require('../mongoose');

module.exports = async function getMessages(io, broker, username, data) {
    const queue = await broker.queue(username + "-" + data.roomName + "-queue").assert()
    console.log("get room messages")
    const messageList = await mongoose.getRoomMessages(data.roomName);
    io.emit(
        'get-messages',
        messageList
    );
    queue.sub(async msg => {
        const messageContent = msg.content;
        const messageList = await mongoose.getRoomMessages(data.roomName);
        messageList.push(messageContent);
        io.emit(
            'get-messages',
            messageList
        );
        if (username === messageContent.username) {
            mongoose.addNewMessages(messageContent, data.roomName);
        }
    }).catch((e) => {
        console.error(e)
    })
}