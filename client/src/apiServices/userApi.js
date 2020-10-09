import * as axios from "axios";
import {getDataWithPagination} from "../constants";

export const usersApi = {
    getAll(pageNumber, pagination) {
        return getDataWithPagination('/api/admin/users', pageNumber, pagination)
            .then(response => response.data)
    },
    appointment(userId, role) {
        axios.post('/api/admin/appoint-admin', {userId, role}).then(response => response.data)
    },
    userLock(userId) {
        return axios.post('/api/admin/userlock', {userId}).then(response => response.data)
    },
    getUserCards(id) {
        return axios.get(`/api/user/user-cards/${id}`).then(response => response.data)
    },
    me(id) {
        return axios.get(`/api/user/me/${id}`).then(response => response.data)
    },
    getUserSets(id) {
        return axios.get(`/api/user/user-sets/${id}`).then(response => response.data)
    },
    getBetHistory(id) {
        return axios.get(`/api/user/bet-history/${id}`).then(response => response.data)
    }
}
