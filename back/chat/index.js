let app = require('express')();
let http = require('http').createServer(app);
const PORT = process.env.PORT || 8080;
let io = require('socket.io')(http)
const mongoose = require('mongoose');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:H3ljVKmxsVBc4fiu@cluster0.yjsgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

client.connect(function (err, db) {
    if (err) throw err;
    let dbo = db.db("myFirstDatabase");
    connected_users_db = dbo.collection("users");
    console.log("MongoDB Connected")
});


function setConnectedUser(username, status) {
    const update = { connected: status };
    connected_users_db?.updateOne({name: username}, {$set: update}, function (err, res) {
        if (err) throw err;
    });
}


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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Origin', '*');
    next();
})


http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    console.log('New client connected');
    socket.emit('connection', null);
    socket.on('identify', username => {
        setConnectedUser(username, true);
        socket.username = username;
    })
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
    socket.on('send-message', message => {
        console.log("New message: ", message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected")
        setConnectedUser(socket.username, false);
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



/**
 * @description This methos retirves the static channels
 */
app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});
