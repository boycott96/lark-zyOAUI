const getters = {
    getAppId: state => {
        return state.app.app_id;
    },
    getRedirectUri: state => {
        return state.app.redirect_uri;
    },
    getAppSecret: state => {
        return state.app.app_secret;
    },
    getHeaders: state => {
        return state.request.headers;
    }
}

export default getters;