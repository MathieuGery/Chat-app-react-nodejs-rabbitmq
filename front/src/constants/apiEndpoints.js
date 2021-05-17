const BASE_URL = process.env.REACT_APP_AUTH_API_URL;

export const SIGN_IN_URL = BASE_URL + '/auth/login';
export const SIGN_UP_URL = BASE_URL + '/auth/register';
export const LIST_ROOMS = BASE_URL + '/rooms/list';
export const CREATE_ROOM_URL = BASE_URL + '/rooms/create';
export const LIST_USERS = BASE_URL + '/auth/list';
export const RECOVER_PASSWORD_URL = BASE_URL + '/auth/recover_password_final';
export const FORGOT_PASSWORD_URL = BASE_URL + '/auth/recover_password';
