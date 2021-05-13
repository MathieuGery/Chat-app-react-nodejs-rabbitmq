import React from 'react';

export default function Message(props) {

    return (
        <div>
            <div
                className={`${props.sent ? 'float-right' : 'float-left'} flex-initial p-2 m-2 text-sm text-justify rounded-md bg-gray-300 justify-center items-center`}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
