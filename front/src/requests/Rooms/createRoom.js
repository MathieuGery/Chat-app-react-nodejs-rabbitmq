import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import { CREATE_ROOM_URL } from '../../constants/apiEndpoints';
import Cookies from "js-cookie";

export default async function createRoom(creator, name, members) {
    let body = {
        'creator': creator,
        'name': name,
        'members': members
    };

    console.log(body)
    let config = setAxiosConfig('POST', CREATE_ROOM_URL, false);
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;
    config['data'] = body;
    if (!name || !creator) {
        return {warning: "One or more field(s) is/are blank"};
    }
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
