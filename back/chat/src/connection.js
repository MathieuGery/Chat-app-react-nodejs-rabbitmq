const mongoose = require('../mongoose');
require('dotenv').config()

module.exports = function connection(socket) {
    socket.emit('connection', null);
    try {
        mongoose.setConnectedUser(socket.handshake.query.username, true);
    } catch (e) {
        console.log(e);
    }
    socket.username = socket.handshake.query.username;
    console.log('New client connected with username: ', socket.username);
}