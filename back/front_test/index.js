//ici on utilise un require mais parce qu'on a fait le bail en node, toi utilise import ca:
//import io from 'socket.io-client';

const io = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
    //Dans emit tu send le username du gajo (mais là nous on avait juste pris l'argument du program)
    socket.emit("identify", process.argv[2] || 'no_username');
    //La liste des users connecté ca marche pas
    // socket.on('connected user list', (users) => {
    //     console.log(users);
    // })
});