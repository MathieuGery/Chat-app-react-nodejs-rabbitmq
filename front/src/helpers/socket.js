import socketIOClient from "socket.io-client";
const socket = socketIOClient(process.env.REACT_APP_CHAT_SERVER_URL);

function getChatMessageSocket(setMessages) {
    socket.on("list_messages", messages => {
        setMessages(messages)
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
