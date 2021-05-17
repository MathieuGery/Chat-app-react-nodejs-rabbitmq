import React from 'react';

export default function Message(props) {

    return (
        <div>
            <div
                className={`${props.sent ? 'float-right bg-green-300':'float-left bg-gray-300'} max-w-sm flex-initial p-2 m-2 text-sm text-left rounded-md  justify-center items-center`}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
