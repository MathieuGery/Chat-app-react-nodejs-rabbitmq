import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import { SIGN_UP_URL } from '../../constants/apiEndpoints';

export default async function signup(username, email, password, cpassword) {
    let body = {
        'name': username,
        'email': email,
        'password': password,
    };
    let config = setAxiosConfig('POST', SIGN_UP_URL, true);

    config['data'] = body;
    if (!username || !email || !password ||!cpassword)
        return {warning: "One or more field(s) is/are blank"};
    if (password !== cpassword)
        return {warning: "The two password you entered are not identical"}
    return await axios(config).then((response) => {
        if (response.status === 201) {
            return {success: response.data};
        } else {
            return {warning: response.data.message}
        }
    }).catch((error) => {
        throw error;
    });
}