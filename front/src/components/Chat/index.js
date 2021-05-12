import {useState} from "react";
import {sendMessageSocket} from "../../helpers/socket";

export default function Chat() {
    const [message, setMessage] = useState("");

    return (
        <div className="absolute insert-x-0 bottom-0 my-4">
            <form noValidate onSubmit={(e) => {sendMessageSocket(message); setMessage(""); e.preventDefault();}}>
                <input
                    type="text"
                    name="message"
                    id="message"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Type your message"
                    onChange={(event => setMessage(event.target.value))}
                    value={message}
                />
            </form>
        </div>
    )
}
