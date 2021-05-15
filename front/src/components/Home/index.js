import React, {useState, useEffect} from 'react';
import SideBarMobile from "../SideBar/SideBarMobile";
import SideBarDesktop from "../SideBar/SideBarDesktop";
import ChatList from "../ChatList";
import Chat from "../Chat";
import {getChatMessageSocket, identifyUserChatSocket} from "../../helpers/socket";
import Logo from "../utils/Logo";


function Home() {
    const [isOpen, setIsOpen] = useState(false);
    // const [message, setMessage] = useState("'");
    const [roomId, setRoomId] = useState("'");

    useEffect(() => {
        //getChatMessageSocket(setMessage)
        // identifyUserChatSocket("test")
    }, []);

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            {isOpen && (
                <SideBarMobile isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
            {/*<!-- Static sidebar for desktop -->*/}
            <SideBarDesktop/>

            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                <div className="lg:hidden">
                    <div className="bg-indigo-600 py-2 px-4 flex items-center justify-between sm:px-6 lg:px-8">
                        <div>
                            <Logo/>
                        </div>
                        <div>
                            <button type="button" className="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"  onClick={() => {setIsOpen(true);}}>
                                <span className="sr-only">Open sidebar</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <main className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex xl:overflow-hidden">
                        <section aria-labelledby="primary-heading" className="min-w-0 max-w-lg h-full flex flex-col overflow-hidden flex-1 lg:order-first">
                            <h1 id="primary-heading" className="sr-only text-black ">Account</h1>
                            <ChatList setRoomId={setRoomId}/>
                        </section>

                        <aside className="hidden lg:block lg:flex-shrink-0 flex-1">
                            <div className="h-full relative flex flex-col border-l-2 border-solid border-black border-r border-gray-200 bg-white">
                                <Chat roomId={roomId}/>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
);
}

export default Home;
