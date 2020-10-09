import * as axios from "axios";
import {getDataWithPagination} from "../constants";

export const setsApi = {
    getAll(pageNumber, pagination) {
        return getDataWithPagination('/api/admin/sets', pageNumber, pagination)
            .then(response => response.data)
    },
    createSet(set_name, set, bonus) {
        return axios.post('/api/admin/create/set', {set_name, set, bonus}).then(response => response.data)
    }
}