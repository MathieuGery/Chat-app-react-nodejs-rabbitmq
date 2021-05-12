import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketIOClient(ENDPOINT);

function getChatMessageSocket(setMessage) {
    socket.on("message", message => {
        setMessage(message)
    });
}

function sendMessageSocket(message) {
    if (!message) return
    socket.emit("send-message", message);
}

function identifyUserChatSocket(username) {
    if (!username) return
    socket.emit("identify", username);
}

export { getChatMessageSocket, sendMessageSocket, identifyUserChatSocket}
