import React from 'react';
import PropTypes from "prop-types";
import {XCircleIcon} from "@heroicons/react/solid";

export default function ErrorAlert(props) {
    return (
        <div id="error-alert-box" className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{props.title}</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>
                            {props.children}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

ErrorAlert.propTypes = {
    title: PropTypes.string.isRequired,
};