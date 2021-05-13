import {useState} from "react";
import {sendMessageSocket} from "../../helpers/socket";

export default function Chat(props) {
    const [message, setMessage] = useState("");

    const sendMessage = (e) => {
        if (message !== "") {
            sendMessageSocket(message);
            setMessage("");
            e.preventDefault();
        }
    }

    return (
        <div className="absolute inset-x-0 bottom-0 m-4">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {props.roomId}
            </span>
            <form noValidate onSubmit={(e) => {sendMessage(e)}}>
                <div className="flex flex-row">
                    <input type="text" name="message" id="message" placeholder="Type your message"
                           className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                           onChange={(event => setMessage(event.target.value))} value={message}/>
                    <button onClick={(e) => {sendMessage(e)}} type="button" className="inline-flex items-center px-3 py-1.5 ml-4 border border-transparent shadow-sm text-sm leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Send
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}
