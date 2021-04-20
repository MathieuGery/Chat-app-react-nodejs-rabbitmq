import Cookies from 'universal-cookie';

export default function setAxiosConfig(method, fetchUrl, noJWT) {
    const cookies = new Cookies();
    let config = {};
    let headers = {};

    if (!noJWT) {
        headers['Authorization'] = `Bearer ${cookies.get('jwt')}`;
    }
    headers['Content-Type'] = 'application/json';
    // headers['If-None-Match'] = '';
    config['headers'] = headers;
    config['method'] = method;
    config['url'] = fetchUrl;

    return config;
}
