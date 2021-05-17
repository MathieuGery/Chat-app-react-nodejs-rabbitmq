let rabbitConn = require('../rabbitmq')

module.exports = async function getMessages(io, broker, username, data) {
    console.log('fired');

    const queue = await broker.queue(username + "-" + data.roomName + "-queue").assert()
    queue.sub(msg => {
        const messageContent = msg.content;
        console.log("From Rabbitmq", messageContent);
        try {
            io.emit(
                'get-messages',
                [messageContent]
            );
        } catch (e) {
            console.log(e);
        }
    })
}
