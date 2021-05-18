const preConnection = require("./src/preConnection");
const connection = require("./src/connection");
const getMessages = require("./src/getMessages");
const sendMessage = require("./src/sendMessage");
const disconnect = require("./src/disconnect");

let app = require('express')();
require('dotenv').config()
let http = require('http').createServer(app);
const PORT = process.env.PORT || 8080;
const mongoose = require('./mongoose');
const cors = require('cors');
const { Rabbit } = require("ezmqp")

mongoose.connect();

let io = require('socket.io')(http, {
    cors: {
        origin: process.env.CORS_RULES,
        credentials: false
    }
})

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.use((socket, next) => {
    preConnection(socket, next)
}).on('connection', async (socket) => { // socket object may be used to send specific messages to the new connected client
    connection(socket)
    const broker = await new Rabbit({ connection: process.env.RABBITMQURI }).connect();
    let subbedQueueName = null;
    socket.on('get-messages', async room => {
        if (subbedQueueName) {
            const queue = await broker.queue(subbedQueueName).assert();
            await queue.cancel();
        }
        subbedQueueName = await getMessages(io, broker, socket.username, room);
    });
    socket.on('send-message', message => sendMessage(broker, message));
    socket.on('disconnect', () => disconnect(socket.username));
});
