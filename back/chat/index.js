const preConnection = require("./src/preConnection");
const connection = require("./src/connection");
const getMessages = require("./src/getMessages");
const sendMessage = require("./src/sendMessage");
const disconnect = require("./src/disconnect");
const joinRoom = require("./src/joinRoom")

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
    const broker = await new Rabbit({ connection: process.env.RABBITMQURI }).connect()

    // creates the exchange if it does not exist
    const exchange = await broker.exchange("general-exchanger", {type: "fanout"}).assert()

    // creates the queue if it does not exist
    const queue = await broker.queue(`${socket.username}-general-queue`).assert()

    // bind the queue to the exchange (if it wasn't already done)
    await exchange.bind(queue)

    socket.on('get-messages', data => {getMessages(io, broker, socket.username, data)});
    socket.on('join-room', roomName => {joinRoom(broker, roomName, socket.username)});
    socket.on('send-message', message => sendMessage(broker, message));
    socket.on('disconnect', () => disconnect(socket.username));
});
