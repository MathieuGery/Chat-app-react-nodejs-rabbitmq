let rabbitConn = require('../rabbitmq')

module.exports = function sendMessage(message) {
    rabbitConn(function (conn) {
        conn.createChannel(function (err, channel) {
            if (err) {
                throw new Error(err)
            }
            let ex = 'chat_ex'
            // let q = 'chat_q'

            channel.assertExchange(ex, 'fanout', {durable: true})
            channel.publish(ex, '', Buffer.from(JSON.stringify(message)), {persistent: 'true'})
            channel.close();
        })
    });
}
