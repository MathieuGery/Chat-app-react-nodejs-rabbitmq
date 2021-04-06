import React from 'react';

function SideBarDesktop() {

    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-20">
                <div className="flex flex-col h-0 flex-1 overflow-y-auto bg-indigo-600">
                    <div className="flex-1 flex flex-col">
                        <div className="flex-shrink-0 bg-indigo-700 py-4 flex items-center justify-center">
                            <img className="h-8 w-auto"
                                 src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow"/>
                        </div>
                        <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
                            <button
                                className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                                <span className="sr-only">Home</span>
                            </button>

                            <button
                                className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
                                </svg>
                                <span className="sr-only">Trending</span>
                            </button>

                            <button
                                className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <span className="sr-only">Bookmarks</span>
                            </button>

                            <button
                                className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                </svg>
                                <span className="sr-only">Messages</span>
                            </button>

                            <button
                                className="btn flex items-center p-4 rounded-lg text-indigo-200 hover:bg-indigo-700">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                <span className="sr-only">Profile</span>
                            </button>
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex pb-5">
                        <button className="btn flex-shrink-0 w-full">
                            <img className="block mx-auto h-10 w-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                                 alt=""/>
                            <div className="sr-only">
                                <p>
                                    Lisa Marie
                                </p>
                                <p>
                                    Account settings
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBarDesktop;
