const mongoose = require('../mongoose');

module.exports = function disconnect(username) {
    console.log("User disconnected")
    try {
        mongoose.setConnectedUser(username, false);
    } catch (e) {
        console.log(e);
    }
}
