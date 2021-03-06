import socketIOClient from "socket.io-client";
import Cookies from 'js-cookie';

const token = Cookies.get("jwt");
const username = Cookies.get("username");
const socket = socketIOClient(process.env.REACT_APP_CHAT_SERVER_URL, {
    query: {token, username}
});

function getChatMessageSocket(setMessages, messagesContainerRef) {
    socket.on("get-messages", messages => {
        setMessages(messages)
        messagesContainerRef.current?.scrollIntoView({ behavior: "smooth" })
    });
}

function sendMessageSocket(message, username, roomName) {
    if (!message) return
    socket.emit("send-message", {message: message, username: username, roomName: roomName});
}

function requestMessages(roomName) {
    socket.emit("get-messages", {roomName: roomName});
}

function disconnectSocket() {
    socket.close();
}


export { getChatMessageSocket, sendMessageSocket, requestMessages, disconnectSocket}
