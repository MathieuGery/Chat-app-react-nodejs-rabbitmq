import socketIOClient from "socket.io-client";
import Cookies from 'js-cookie';

const token = Cookies.get("jwt");
const username = Cookies.get("username");
const socket = socketIOClient(process.env.REACT_APP_CHAT_SERVER_URL, {
    query: {token, username}
});

function getChatMessageSocket(setMessages) {
    socket.on("get-messages", messages => {
        setMessages(messages)
    });
}

function sendMessageSocket(message, username) {
    if (!message) return
    socket.emit("send-message", {message: message, username: username});
}

function identifyUserChatSocket(username) {
    if (!username) return
    socket.emit("get-messages", username);
}

export { getChatMessageSocket, sendMessageSocket, identifyUserChatSocket}
