import React from 'react';
import Logo from "../utils/Logo";
import Modal from "../utils/Modal";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function SideBarDesktop() {
    let history = useHistory();
    const [showModal, setShowModal] = React.useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const logout = () => {
        Cookies.remove('jwt');
        Cookies.remove('username');
        history.push('/');
    }

    return (
        <>
            <Modal show={showModal} open={openModal} close={closeModal} setShow={setShowModal}/>
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-20">
                    <div className="flex flex-col h-0 flex-1 overflow-y-auto bg-indigo-600">
                        <div className="flex-1 flex flex-col">
                            <div className="flex-shrink-0 py-4 flex items-center justify-center">
                                <Logo/>
                            </div>
                            <nav aria-label="Sidebar" className="py-6 flex flex-col justify-between h-full items-center space-y-3">
                                <button className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-800 bg-indigo-700" onClick={() => {openModal()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    <span className="sr-only">New message</span>
                                </button>

                                <button className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-800 bg-indigo-700" onClick={() => {logout()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="sr-only">Logout</span>
                                </button>
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex pb-5">
                            <img className="block mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80" alt=""/>
                            <div className="sr-only">
                                <p>Lisa Marie</p>
                                <p>Account settings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBarDesktop;
