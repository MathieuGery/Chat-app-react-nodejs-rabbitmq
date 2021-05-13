import socketIOClient from "socket.io-client";
const socket = socketIOClient(process.env.REACT_APP_CHAT_SERVER_URL);

function getChatMessageSocket(setMessage) {
    socket.on("message", message => {
        console.log(message)
        setMessage(message)
    });
}

function sendMessageSocket(message, username) {
    if (!message) return
    socket.emit("send-message", {message: message, username: username});
}

function identifyUserChatSocket(username) {
    if (!username) return
    socket.emit("identify", username);
}

export { getChatMessageSocket, sendMessageSocket, identifyUserChatSocket}
