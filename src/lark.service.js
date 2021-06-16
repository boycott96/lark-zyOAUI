import Axios from 'axios';

// 获取访问凭证
export const getAccessToken = (url, params, headers) => {
    return Axios.get(url, { params, headers });
}

// 获取登录用户身份
export const getLoginData = (url, params, headers) => {
    return Axios.post(url, params, { headers })
}

// 获取用户具体信息（工号）
export const getUserData = (url, params, headers) => {
    return Axios.get(url, { params, headers });
}