import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";
const socket = socketIOClient(ENDPOINT);

function getChatMessageSocket(setMessage) {
    socket.on("message", message => {
        console.log(message)
        setMessage(message)
    });
}

function sendMessageSocket(message) {
    if (!message) return
    console.log(message)
    socket.emit("send-message", message);
}

function identifyUserChatSocket(username) {
    if (!username) return
    socket.emit("identify", username);
}

export { getChatMessageSocket, sendMessageSocket, identifyUserChatSocket}
