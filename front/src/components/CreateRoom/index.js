import React, {useState} from "react";
import createRoom from "../../requests/Rooms/createRoom";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

export default function CreateRoom(props) {

    const [roomName, setRoomName] = useState("");
    const [members, setMembers] = useState("");

    const createRoomAPI = () => {
        let membersObject = [{"name": Cookies.get("email"), "status": "pending"}];
        let membersList = members.split(";");

        if (!roomName || !members) {
            toast.error("One or more fields are blank")
            return
        }
        for (const val of membersList) {
            membersObject.push({"name": val, "status": "pending"})
        }
        createRoom(Cookies.get("email"), roomName, membersObject).then((response) => {
            if (response.success) {
                toast.success("Room has been created !")
                props.setShow(false);
                window.location.reload();
            }
        }).catch(() => { toast.error("Room has already been created");
            props.setShow(false);
        });
    }
    return (
        <>
            {props.show ? (
                <>
                    <div className="justify-center w-screen h-screen items-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto mx-auto pt-28 max-w-2xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex h-20 items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl">Create new room</h3>
                                    <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => props.close()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-8">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Room Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            value={roomName}
                                            type="text"
                                            name="roomName"
                                            id="roomName"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="My first room"
                                            required
                                            onChange={(event => setRoomName(event.target.value))}
                                        />
                                    </div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 pt-8">
                                        Members
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            value={members}
                                            type="text"
                                            name="roomName"
                                            id="roomName"
                                            required
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="My first room"
                                            onChange={(event => setMembers(event.target.value))}
                                        />
                                    </div>
                                    <div className="pt-8">
                                        <button
                                            type="submit"
                                            onClick={() => {createRoomAPI()}}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
                </>
            ) : null}
        </>
    );
}
