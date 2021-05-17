import React from 'react';

export default function Message(props) {

    return (
        <div>
            <p className="text-xs font-thin ml-2 mb-0">{props.sent ? "": props.name}</p>
            <div
                className={`${props.sent ? 'float-right bg-green-300':'float-left bg-gray-300'} max-w-sm flex-initial p-2 ml-2 mb-2 text-sm text-left rounded-md  justify-center items-center`}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
