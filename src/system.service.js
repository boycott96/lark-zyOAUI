import Axios from 'axios';

/**
 * 致远
 * @param {*} params 
 * @returns 
 */
export const ssoLogin = (params) => {
    return Axios.post('/local/zy_local/ssoLogin', params);
}