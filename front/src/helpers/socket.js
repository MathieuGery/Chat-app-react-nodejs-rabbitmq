import socketIOClient from "socket.io-client";
import Cookies from 'js-cookie';

const token = Cookies.get("jwt");
const username = Cookies.get("username");
const socket = socketIOClient(process.env.REACT_APP_CHAT_SERVER_URL, {
    query: {token, username}
});

function getChatMessageSocket(setMessages) {
    socket.on("get-messages", messages => {
        console.log("J'ai un message");
        console.log(messages);
        setMessages(messages)
    });
}

function sendMessageSocket(message, username) {
    if (!message) return
    socket.emit("send-message", {message: message, username: username});
}

function identifyUserChatSocket() {
    socket.emit("get-messages");
}

function joinRoomChatSocket(roomName) {
    socket.emit("join-room", {roomName: roomName});
}

export { getChatMessageSocket, sendMessageSocket, identifyUserChatSocket, joinRoomChatSocket}
