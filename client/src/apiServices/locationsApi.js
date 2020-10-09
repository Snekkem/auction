import * as axios from "axios";
import {getDataWithPagination} from "../constants";

export const locationsApi = {
    getAll(pageNumber, pagination) {
        return getDataWithPagination('/api/user/locations', pageNumber, pagination)
            .then(response => response.data)
    },
    deleteById(id) {
        return axios.delete(`/api/admin/delete/location/${id}`).then(response => response.data)
    },
    update(id, dataToUpdate) {
        return axios.put(`/api/admin/update/location/${id}`, {dataToUpdate}).then(response => response.data)
    },
    create(name, type, dimension) {
        return axios.post('/api/admin/create/location', {name, type, dimension}).then(response => response.data)
    }
}