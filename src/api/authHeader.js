import {selectCredentials} from "../reducers/authSlice.js";

const authHeader =  (headers, { getState }) => {
    const { username, password } = selectCredentials(getState());

    if (username && password) {
        const basicAuth = btoa(`${username}:${password}`);
        headers.set('Authorization', `Basic ${basicAuth}`);
    }

    return headers;
}

export default authHeader;