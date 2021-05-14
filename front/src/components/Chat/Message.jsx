import React from 'react';

export default function Message(props) {

    return (
        <div>
            <div
                className={`${props.sent ? 'float-left bg-green-300' : 'float-right bg-gray-300'} flex-initial p-2 m-2 text-sm text-justify rounded-md  justify-center items-center`}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
