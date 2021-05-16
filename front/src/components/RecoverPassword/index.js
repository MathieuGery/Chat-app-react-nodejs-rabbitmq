import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import recoverPassword from "../../requests/Auth/recoverPassword";
import Cookies from "js-cookie";
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";
import SuccessAlert from "../Alerts/SuccessAlert";
import WarningAlert from "../Alerts/WarningAlert";
import ErrorAlert from "../Alerts/ErrorAlert";

function RecoverPassword() {
    const {key} = useParams();
    const [password, setPassword] = useState("");
    const [cpPassword, setCpPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState({})
    console.log(key);

    const callRecoverPasswordRequest = (event) => {
        setAlertMessage({});
        recoverPassword(key.slice(5), password, cpPassword).then((response) => {
            if (response.success) {
                setAlertMessage({success: "Your password has been updated !"})
                setTimeout(() => {
                }, 500);
            }
            else if (response.warning)
                setAlertMessage({warning: response.warning})
        }).catch((error) => {
            setAlertMessage({error: handleAxiosResponseError(error)})
        });
        event.preventDefault();
    }

    function buildAlert() {
        if (alertMessage.success) {
            return (<SuccessAlert title={"Success !"}>{alertMessage.success}</SuccessAlert>)
        } else if (alertMessage.warning) {
            return (<WarningAlert title={"Warning !"}>{alertMessage.warning}</WarningAlert>)
        } else if (alertMessage.error) {
            return (<ErrorAlert title={"Error !"}>{alertMessage.error}</ErrorAlert>)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {(alertMessage.success || alertMessage.warning || alertMessage.error) &&
            <div className="mb-6">
                {buildAlert()}
            </div>
            }
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-auto stroke-current text-indigo-500" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                </svg>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Recover your password
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={(e) => callRecoverPasswordRequest(e)}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="password" value={password}
                                       onChange={(event => setPassword(event.target.value))} required
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Repeat password
                            </label>
                            <div className="mt-1">
                                <input id="repeat_password" name="repeat_password" type="repeat_password" autoComplete="repeat_password" value={cpPassword}
                                       onChange={(event => setCpPassword(event.target.value))} required
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecoverPassword;
