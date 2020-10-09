import * as axios from "axios";
import {getDataWithPagination} from "../constants";

export const episodesApi = {
    getAll(pageNumber, pagination) {
        return getDataWithPagination(`/api/user/episodes`, pageNumber, pagination)
            .then(response => response.data)
    },
    deleteById(id) {
        return axios.delete(`/api/admin/delete/episode/${id}`).then(response => response.data)
    },
    update(id, dataToUpdate) {
        return axios.put(`/api/admin/update/episode/${id}`, {dataToUpdate}).then(response => response.data)
    },
    create(name, episode) {
        return axios.post('/api/admin/create/episode', {name, episode}).then(response => response.data)
    }
}
