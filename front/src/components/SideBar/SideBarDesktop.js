import React from 'react';
import Logo from "../utils/Logo";
import Modal from "../utils/Modal";

function SideBarDesktop() {
    const [showModal, setShowModal] = React.useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <Modal show={showModal} open={openModal} close={closeModal}/>
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-20">
                    <div className="flex flex-col h-0 flex-1 overflow-y-auto bg-indigo-600">
                        <div className="flex-1 flex flex-col">
                            <div className="flex-shrink-0 py-4 flex items-center justify-center">
                                <Logo/>
                            </div>
                            <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
                                <button className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700" onClick={() => {openModal()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    <span className="sr-only">New message</span>
                                </button>

                                <button className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    <span className="sr-only">Profile</span>
                                </button>
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex pb-5">
                            <button className="btn flex-shrink-0 w-full">
                                <img className="block mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80" alt=""/>
                                <div className="sr-only">
                                    <p>Lisa Marie</p>
                                    <p>Account settings</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBarDesktop;
