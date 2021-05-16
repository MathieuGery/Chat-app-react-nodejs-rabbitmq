let rabbitConn = require('../rabbitmq')

function consumeAndSend(io, conn, channel, username, queue) {
    let numChunks = 0;
    let array = []
    channel.consume(username, function (msg) {
        if (msg.content) {
            let resChunk = msg.content.toString()
            io.emit('get-messages', [JSON.parse(resChunk)]);
//             array.push(JSON.parse(resChunk))
//             numChunks += 1;
//             if (numChunks === queue.messageCount || queue.messageCount === 0) {
//                 io.emit('get-messages', array);
// //                channel.close();
//             }
        }
    }, {
        noAck: true
    });
}

module.exports = function getMessages(io, username) {
    rabbitConn(function (conn) {
        conn.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            let ex = 'chat_ex'

            channel.assertExchange(ex, 'fanout', {
                durable: true
            });

            // Just for testing with one general canal, user queue will have his username
            console.log(username);
            channel.assertQueue(username, {
                exclusive: false,
            }, function (error2, queue) {
                if (error2) {
                    throw error2;
                }
                channel.bindQueue(username, ex, '');
                consumeAndSend(io, conn, channel, username, queue)
            });
        });
    })
}