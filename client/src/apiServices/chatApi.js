import * as axios from "axios";

export const chatApi = {
    getMessages() {
        return axios.get('/api/user/chat').then(response => response.data)
    },
    sendMessage(userId, message) {
        return axios.post('/api/user/send-message', {userId, message}).then(response => response.data)
    }
}