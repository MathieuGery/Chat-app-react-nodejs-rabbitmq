require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGOURI;

let users_db, rooms_db;

exports.connect = function () {
    const mongoose = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    mongoose.connect(function (err, db) {
        if (err) throw err;
        let dbo = db.db("myFirstDatabase");
        users_db = dbo.collection("users");
        rooms_db = dbo.collection("rooms");
        console.log('MongoDB is connected')
    });
    return mongoose;
}

exports.setConnectedUser = function (username, status)  {
    const update = { connected: status };
    users_db?.findOneAndUpdate({name: username}, {$set: update}, function (err, res) {
        if (!res.value) {
            console.log("No user found");
        }
        if (err)  {
            throw err;
        }
    });
}

exports.addNewMessages = function (message, roomName)  {
    console.log(message)
    rooms_db?.findOneAndUpdate({name: roomName}, {$push: {messages: message}}, function (err, res) {
        if (!res.value) {
            console.log("No Room found");
        }
        if (err)  {
            throw err;
        }
    });
}

exports.getRoomMessages = async function (roomName)  {
    let res = await rooms_db?.findOne({name: roomName});
    return res.messages
}