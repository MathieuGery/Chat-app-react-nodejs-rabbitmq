const io = require("socket.io")(3000, {});
let amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');

const server = io.listen(5000);
console.log(`Listening on 5000`);
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:H3ljVKmxsVBc4fiu@cluster0.yjsgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
let connected_users_db = null;

client.connect(function (err, db) {
    if (err) throw err;
    let dbo = db.db("myFirstDatabase");
    connected_users_db = dbo.collection("connected_users");
});

function setConnectedUser(username) {
    connected_users_db?.insertOne({name: username}, function (err, res) {
        if (err) throw err;
    });
}

function removeConnectedUser(username) {
    connected_users_db?.deleteOne({name: username}, function (err, res) {
        if (err) throw err;
    });
}

//ca marche pas
// function getConnectedUserList() {
//     let connect_user_list = [];
//     connected_users_db.find({}, (err, users) => {
//         if (err) throw err;
//         users.forEach((user) => connect_user_list.push(user?.name));
//     })
//     return connect_user_list;
// }

server.on('connection', socket => {
    socket.on('identify', (user) => {
        //Set him to online in bdd
        setConnectedUser(user);
        socket.user = user;
        // const connect_user_list = getConnectedUserList();
        // socket.emit('connected user list', connect_user_list);
    })
    socket.on('disconnect', () => {
        if (!socket.user)
            return;
        //Set him to offline in bdd
        removeConnectedUser(socket.user);
    });
});