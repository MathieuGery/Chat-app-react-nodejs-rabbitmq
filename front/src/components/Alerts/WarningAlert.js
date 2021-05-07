import React from 'react';
import PropTypes from "prop-types";
import {ExclamationIcon} from '@heroicons/react/solid'

export default function WarningAlert(props) {
    return (
        <div id="warning-alert-box" className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">{props.title}</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

WarningAlert.propTypes = {
    title: PropTypes.string.isRequired,
};