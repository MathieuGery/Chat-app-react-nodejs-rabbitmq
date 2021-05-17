import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import {LIST_USERS} from '../../constants/apiEndpoints';
import Cookies from "js-cookie";

export default async function listUsers() {
    let config = setAxiosConfig('GET', LIST_USERS, false);
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;
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
