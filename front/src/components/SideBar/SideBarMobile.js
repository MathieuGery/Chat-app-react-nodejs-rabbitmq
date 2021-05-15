import {Transition} from "@tailwindui/react";
import React from 'react';
import Modal from "../utils/Modal";
import Logo from "../utils/Logo";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function SideBarMobile(props) {
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
            <Modal show={showModal} open={openModal} close={closeModal}/>
            <div className="lg:hidden">
                <div className="fixed inset-0 flex z-40">
                    <Transition
                        show={props.isOpen}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-600 opacity-75"/>
                        </div>
                    </Transition>
                    <div tabIndex="0" className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                        <div className="absolute top-0 right-0 -mr-12 pt-4">
                            <button className="btn ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"  onClick={() => {props.setIsOpen(false);}}>
                                <span className="sr-only">Close sidebar</span>
                                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="pt-5 pb-4">
                            <div className="flex-shrink-0 flex items-center px-4">
                                <Logo/>
                            </div>
                            <nav aria-label="Sidebar" className="mt-5 justify-between h-full">
                                <div className="px-2 space-y-1">
                                    <button className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700" onClick={() => {openModal()}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                        </svg>
                                        <span className="sr-only">New message</span>
                                    </button>

                                    <button className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700" onClick={() => {logout()}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="sr-only">Logout</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <div className="flex items-center">
                                <div>
                                    <img className="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80" alt=""/>
                                </div>
                                <div className="ml-3">
                                    <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Lisa Marie</p>
                                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Account Settings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBarMobile;
