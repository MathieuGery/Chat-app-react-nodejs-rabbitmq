import {useState, useEffect} from "react";
import {getChatMessageSocket, identifyUserChatSocket, sendMessageSocket} from "../../helpers/socket";
import Message from "./Message";
import Cookies from "js-cookie";

export default function Chat(props) {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = (e) => {
        if (message !== "") {
            sendMessageSocket(message, Cookies.get("username"), props.roomId);
            setMessage("");
            e.preventDefault();
        }
    }

    useEffect(() => {
        identifyUserChatSocket();
        getChatMessageSocket(setAllMessages)
    }, []);

    const buildMessageList = () => {
        if (allMessages.length === 0) {
            return <div className="w-full text-center mt-6 text-gray-500">No messages</div>
        }
        return allMessages?.map((message, index) => {
            return <Message key={index} sent={message.username === Cookies.get("username")} text={message.message}/>
        })
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-center items-center border-b border-solid border-blueGray-200 p-2">
                <p>Room ID: {props.roomId}</p>
            </div>
            <div className="flex flex-col overflow-y-auto">
                {buildMessageList()}
            </div>
            <button onClick={(e) => {identifyUserChatSocket(e)}} type="button" className="inline-flex items-center px-3 py-1.5 ml-4 border border-transparent shadow-sm text-sm leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                send get-messages signal
            </button>
            <form noValidate onSubmit={(e) => {sendMessage(e)}}>
                <div className="absolute inset-x-0 bottom-0 flex flex-row m-2">
                    <input type="text" name="message" id="message" placeholder="Type your message"
                           className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                           onChange={(event => setMessage(event.target.value))} value={message}/>
                    <button onClick={(e) => {sendMessage(e)}} type="button" className="inline-flex items-center px-3 py-1.5 ml-4 border border-transparent shadow-sm text-sm leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Send
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}
