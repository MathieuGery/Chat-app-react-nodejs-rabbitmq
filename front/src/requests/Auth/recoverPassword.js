import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import { RECOVER_PASSWORD_URL } from '../../constants/apiEndpoints';

export default async function recoverPassword(key, password, cpassword) {
    let body = {
        'password': password,
    };
    let params = {
        'key': key,
    };
    console.log(key)
    let config = setAxiosConfig('POST', RECOVER_PASSWORD_URL, true);

    config['data'] = body;
    config['params'] = params;
    if (!key || !password ||!cpassword)
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
