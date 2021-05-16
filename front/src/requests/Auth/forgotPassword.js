import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import { FORGOT_PASSWORD_URL } from '../../constants/apiEndpoints';

export default async function forgotPassword(email) {
    let body = {
        'email': email,
    };
    let config = setAxiosConfig('POST', FORGOT_PASSWORD_URL, true);

    config['data'] = body;
    if (!email) {
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
