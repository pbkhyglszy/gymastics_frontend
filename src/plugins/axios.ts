import axios from "axios";
import store from "../store";
import router from "../router";

axios.defaults.baseURL = 'http://10.255.2.129:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


axios.interceptors.request.use((config) => {
    if (store.state.authToken && config.headers) {
        config.headers.Authorization = `Bearer ${store.state.authToken}`
    }
    return config
})

axios.interceptors.response.use((resp) => {
    if (resp && resp.data && resp.data.code === 401) {
        store.commit('clearToken')
        router.push({name: 'Login'})
    }
    return resp;
}, (err) => {
    if (err && err.response) {
        if (err.response.data && err.response.data.code === 401) {
            store.commit('clearToken')
            router.push({name: 'Login'})
        }
        return Promise.resolve(err.response)
    }
    return Promise.reject(err)
})
