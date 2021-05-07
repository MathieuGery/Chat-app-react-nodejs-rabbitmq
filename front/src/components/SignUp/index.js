import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";
import SuccessAlert from "../Alerts/SuccessAlert";
import WarningAlert from "../Alerts/WarningAlert";
import ErrorAlert from "../Alerts/ErrorAlert";
import signup from "../../requests/Auth/signup";
import handleAxiosMultipleResponseError from "../../helpers/handleAxiosMultipleResponseError";

function SignUp(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState({})

    const callSignUpRequest = (event) => {
        setAlertMessage({});
        signup(username, email, password, cpassword).then((response) => {
            if (response.success) {
                setAlertMessage({success: "A mail has been sent to you, please click on the confirmation link to finalise your registration"})
            } else if (response.warning)
                setAlertMessage({warning: response.warning})
        }).catch((error) => {
            setAlertMessage({errors: handleAxiosMultipleResponseError(error)})
        });
        event.preventDefault();
    }

    function buildAlert() {
        if (alertMessage.success) {
            return (<SuccessAlert title={"Success !"}>{alertMessage.success}</SuccessAlert>)
        } else if (alertMessage.warning) {
            return (<WarningAlert title={"Warning !"}>{alertMessage.warning}</WarningAlert>)
        } else if (alertMessage.errors) {
            return (
                <ErrorAlert title={"Sorry you have some errors !"}>
                    <ul>
                        {alertMessage?.errors?.map((elem, index) => {
                            return (<li id={"error-" + index}>&bull; {elem.messages[0]}</li>)
                        })}
                    </ul>
                </ErrorAlert>
            )
        }
    }

    function isErrored(key, value) {
        let isError = false
        if (alertMessage.warning && !value)
            isError = true;
        if (alertMessage.errors) {
            alertMessage.errors.forEach((elem) => {
                console.log(elem.field, key, elem.field === key)
                if ((Array.isArray(elem.field) ? elem.field[0] : elem.field) === key)
                    isError = true;
            })
        }
        if (cpassword !== password && key === 'cpassword')
            isError = true;
        return isError;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-auto stroke-current text-indigo-500"
                     fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                </svg>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    create your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

                {(alertMessage.success || alertMessage.warning || alertMessage.errors) &&
                <div className="mb-6">
                    {buildAlert()}
                </div>
                }

                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form noValidate onSubmit={(e) => callSignUpRequest(e)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input id="username" name="username" type="username" autoComplete="username" required
                                       value={username} onChange={(e) => setUsername(e.target.value)}
                                       className={`appearance-none block w-full px-3 py-2 border ${isErrored("username", username) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required
                                       value={email} onChange={(e) => setEmail(e.target.value)}
                                       className={`appearance-none block w-full px-3 py-2 border ${isErrored("email", email) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                       required value={password} onChange={(e) => setPassword(e.target.value)}
                                       className={`appearance-none block w-full px-3 py-2 border ${isErrored("password", password) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Repeat Password
                            </label>
                            <div className="mt-1">
                                <input id="rep-password" name="rep-password" type="password"
                                       autoComplete="current-password"
                                       required value={cpassword} onChange={(e) => setCPassword(e.target.value)}
                                       className={`appearance-none block w-full px-3 py-2 border ${isErrored("cpassword", cpassword) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                            </div>
                        </div>

                        <div>
                            <button type="submit" id="submit-btn"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign up
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                  Or if you already have an account
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link to="/"
                                  className="btn w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
