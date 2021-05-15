import {useEffect, useState} from "react";
import listRooms from "../../requests/Rooms/list";

function ChatList(props) {
    const [roomsList, setRoomsList] = useState([])

    useEffect(() => {
        listRooms().then((response) => {
            if (response.success) {
                setRoomsList(response.success.rooms);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const changeRoom = (roomID) => {
        props.setRoomId(roomID);
    }

    return (
        <div className="mx-2 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
                {roomsList.map((room, index) => (
                    <li key={index} className="px-6 py-5 relative">
                        <div className="group flex justify-between items-center">
                            <a href="#" className="-m-1 p-1 block" onClick={() => {changeRoom(room._id)}}>
                                <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true"/>
                                <div className="flex-1 flex items-center min-w-0 relative">
                                    <span className="flex-shrink-0 inline-block relative">
                                        <img className="h-10 w-10 rounded-full" src='https://picsum.photos/200/300' alt=""/>
                                        <span className="bg-green-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white" aria-hidden="true"/>
                                    </span>
                                    <div className="ml-4 truncate">
                                        <p className="text-sm font-medium text-gray-900 truncate">{room.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{room.creator}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;
