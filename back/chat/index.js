let app = require('express')();
require('dotenv').config()
let http = require('http').createServer(app);
const PORT = process.env.PORT || 8080;
const mongoose = require('./mongoose');
var rabbitConn = require('./rabbitmq')
const cors = require('cors')
const jwt = require('jsonwebtoken');

mongoose.connect();

let io = require('socket.io')(http,{
    cors: {
      origin: process.env.CORS_RULES,
      credentials: false
    }} )

let STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Friendly user',
    participants: 0,
    id: 2,
    sockets: []
}];

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, process.env.APP_SECRET, function(err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
})
.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    socket.emit('connection', null);
    mongoose.setConnectedUser(socket.handshake.query.username, true);
    socket.username = socket.handshake.query.username;
    console.log('New client connected with username: ', socket.username);
    //Identify the user
    socket.on('get-messages', username => {
        console.log("Username: ", username)

        //Conexion with rabbitmq to get all messages
        rabbitConn(function(conn){
            conn.createChannel(function(err, ch) {
                if (err) {
                    throw new Error(err)
                }
                var q = 'chat_q'
                ch.assertQueue(q, {durable: true}, function(err, status) {
                    if (err) {
                        throw new Error(err)
                    }
                    else if (status.messageCount === 0) {
                        io.emit('get-messages', '{"messages": "no message"}');
                    } else {
                        let numChunks = 0;
                        let array = []
                        ch.consume(q.que, function(msg) {
                            let resChunk = msg.content.toString()

                            array.push(JSON.parse(resChunk))
                            console.log(JSON.parse(resChunk))
                            numChunks += 1
                            if (numChunks === status.messageCount) {
                                io.emit('get-messages', array);
                                ch.close(function() {conn.close()})
                            }
                        })
                    }
                })
            }, {noAck: true})

    })
    })

    //join channel for now it works with socket later it will work with rabbitmq
    socket.on('channel-join', id => {
        console.log('channel join', id);

        STATIC_CHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            }
        });

        return id;
    });

    //Send message
    socket.on('send-message', message => {
        console.log("New message: ", message);

        //Send message to rabbitmq
        rabbitConn(function(conn) {
            conn.createChannel(function(err, ch) {
                if (err) {
                    throw new Error(err)
                }
                let ex = 'chat_ex'
                let q = 'chat_q'

                ch.assertExchange(ex, 'fanout', {durable: false})
                ch.publish(ex, '', new Buffer(JSON.stringify(message)), {persistent: false})
                ch.assertQueue(q, {durable: true})
                ch.sendToQueue(q, new Buffer(JSON.stringify(message)), {persistent: true})
                ch.close(function() {conn.close()})
            })
        })

        rabbitConn(function(conn){
            conn.createChannel(function(err, ch) {
                if (err) {
                    throw new Error(err)
                }
                var q = 'chat_q'
                ch.assertQueue(q, {durable: true}, function(err, status) {
                    if (err) {
                        throw new Error(err)
                    }
                    else if (status.messageCount === 0) {
                        io.emit('get-messages', '{"messages": "no message"}');
                    } else {
                        let numChunks = 0;
                        let array = []
                        ch.consume(q.que, function(msg) {
                            let resChunk = msg.content.toString()

                            array.push(JSON.parse(resChunk))
                            console.log(JSON.parse(resChunk))
                            numChunks += 1
                            if (numChunks === status.messageCount) {
                                io.emit('get-messages', array);
                                ch.close(function() {conn.close()})
                            }
                        })
                    }
                })
            }, {noAck: true})

    })
        //io.emit('get-messages', message);
    });

    //When user is disconnected
    socket.on('disconnect', () => {
        console.log("User disconnected")
        mongoose.setConnectedUser(socket.username, false);

        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });

});

