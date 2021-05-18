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

function requestMessages(currentRoomName, newRoomName) {
    socket.emit("get-messages", {currentRoomName: currentRoomName, newRoomName: newRoomName});
}

function joinRoomChatSocket(roomName) {
    socket.emit("join-room", {roomName: roomName});
}

export { getChatMessageSocket, sendMessageSocket, requestMessages, joinRoomChatSocket}
