import React, {useEffect, useState} from 'react';

export default function UsersList(props) {
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        /*
            listUsers().then((response) => {
                if (response.success) {
                    setUsersList(response.success.users);
                }
            }).catch((error) => {});
        */
        setUsersList([{name: "Roberto", email: "roberto.tadaronne@gmail.com"}, {
            name: "Gilbert",
            email: "gilbert.lechauve@outlook.fr"
        },
            {name: "Andréane", email: "andreane.responsive@epitech.eu"},
            {name: "Andréane", email: "andreane.responsive@epitech.eu"},
            {name: "Andréane", email: "andreane.responsive@epitech.eu"},
            {name: "Andréane", email: "andreane.responsive@epitech.eu"},
            {name: "Andréane", email: "andreane.responsive@epitech.eu"},
            {name: "Andréane", email: "andreane.responsive@epitech.eu"},
            {
            name: "Sophie",
            email: "hakunamatata@gmail.com"
        }, {name: "Fabrice", email: "fabriceaimeleshit@free.fr"}]);
    }, []);

    const newMessage = () => {
        console.log("nouveau message");
    }

    return (
        <div>
            <ul>
                {usersList.map((user, key) => (
                    <li key={key} className="mx-auto flex flex-row justify-between m-6 p-2 border-b border-solid border-blueGray-200" onClick={() => {newMessage()}}>
                        <div className="flex flex-row">
                            <div>
                                <span className="flex-shrink-0 inline-block relative">
                                    <img className="h-10 w-10 rounded-full" src='https://picsum.photos/200/300' alt=""/>
                                    <span className="bg-green-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white" aria-hidden="true"/>
                                </span>
                            </div>
                            <div className="flex flex-col ml-4">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => {newMessage()}} type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
        </div>
    );
}
