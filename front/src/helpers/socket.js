import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketIOClient(ENDPOINT);

function chatSocket(setMessage) {
    socket.on("message", message => {
        setMessage(message)
    });
}

function sendMessageSocket(message) {
    if (!message) return
    socket.emit("send-message", message);
}

export { chatSocket, sendMessageSocket }
