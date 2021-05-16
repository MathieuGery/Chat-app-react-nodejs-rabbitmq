let rabbitConn = require('../rabbitmq')

// function consumeAndSend(io, conn, channel, username, queue) {
//     let numChunks = 0;
//     let array = []
//     channel.consume(username, function (msg) {
//         if (msg.content) {
//             let resChunk = msg.content.toString()
//             io.emit('get-messages', [JSON.parse(resChunk)]);
// //             array.push(JSON.parse(resChunk))
// //             numChunks += 1;
// //             if (numChunks === queue.messageCount || queue.messageCount === 0) {
// //                 io.emit('get-messages', array);
// // //                channel.close();
// //             }
//         }
//     }, {
//         noAck: true
//     });
// }

module.exports = function getMessages(io, queue) {
    console.log('fired');
    queue.sub(msg => {
        const messageContent = msg.content;
        console.log(messageContent);
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