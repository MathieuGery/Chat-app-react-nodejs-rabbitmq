import React, {useEffect, useState} from 'react';
import listUsers from "../../requests/Auth/listUsers";
import Cookies from "js-cookie";
import createRoom from "../../requests/Rooms/createRoom";
import { toast } from 'react-toastify';

export default function UsersList(props) {
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
            listUsers().then((response) => {
                if (response.success) {
                    setUsersList(response.success.users.filter(e => e.name !== Cookies.get("username")));
                }
            }).catch(() => {});
    }, []);

    const newMessage = (user) => {
        createRoom(Cookies.get("email"), Cookies.get("username") + "-" + user.name, [{"name": Cookies.get("email"), "status": "pending"}, {"name": user.email, "status": "pending"}]).then((response) => {
            if (response.success) {
                toast.success("Room has been created !")
                props.setShow(false);
                window.location.reload();
            }
        }).catch(() => { toast.error("Room has already been created");
            props.setShow(false);
        });
    }

    const buildList = () => {
        if (usersList.length === 0)
            return <p>No user</p>
    }

    return (
        <ul>
            {buildList()}
            {usersList.map((user, key) => (
                <li key={key} className="mx-auto flex flex-row justify-between m-6 p-2 border-b border-solid border-blueGray-200">
                    <div className="flex flex-row">
                        <div>
                            <span className="flex-shrink-0 inline-block relative">
                                <img className="h-10 w-10 rounded-full" src='https://picsum.photos/200/300' alt=""/>
                                <span className={user.connected ? "bg-green-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white" : "bg-red-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"} aria-hidden="true"/>
                            </span>
                        </div>
                        <div className="flex flex-col ml-4">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => {newMessage(user)}} type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            New message
                            <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
