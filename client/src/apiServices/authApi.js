import * as axios from "axios";

export const authAPI = {
    Register(name, email, password) {
        return axios.post('/api/auth/register', {name, email, password}).then(response => response.data)
    },
    Login(email, password) {
        return axios.post('/api/auth/login', {email, password}).then(response => response.data)
    }
}