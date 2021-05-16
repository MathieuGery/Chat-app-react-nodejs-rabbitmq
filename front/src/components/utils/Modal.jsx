import React from "react";
import UsersList from "../UsersList/UsersList";

export default function Modal(props) {

    return (
        <>
            {props.show ? (
                <>
                    <div className="justify-center w-screen h-screen items-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto mx-auto pt-28 max-w-2xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex h-20 items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl">Envoyer un nouveau message</h3>
                                    <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => props.close()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="relative overflow-y-scroll px-6" style={{height: '600px'}}>
                                    <UsersList/>
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
