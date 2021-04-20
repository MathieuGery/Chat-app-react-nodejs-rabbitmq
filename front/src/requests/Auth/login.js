import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import { SIGN_IN_URL } from '../../constants/apiEndpoints';

export default async function login(email, password) {
    let body = {
        'email': email,
        'password': password
    };
    let config = setAxiosConfig('POST', SIGN_IN_URL, true);

    config['data'] = body;
    if (!email || !password) {
        return {warning: "One or more field(s) is/are blank"};
    }
    return await axios(config).then((response) => {
        if (response.status === 200) {
            return {success: response.data};
        } else {
            return {warning: response.data.message}
        }
    }).catch((error) => {
        throw error;
    });
}