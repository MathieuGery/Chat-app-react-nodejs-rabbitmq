import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import {LIST_ROOMS} from '../../constants/apiEndpoints';
import Cookies from "js-cookie";

export default async function listRooms() {
    let config = setAxiosConfig('GET', LIST_ROOMS, false);
    let token = Cookies.get('jwt');

    config['params'] = {
        'username': Cookies.get('email'),
    };
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
