import * as axios from "axios";

export const adminApi = {
    getStatistics() {
        return axios.get('/api/admin/statistics').then(response => response.data)
    }
}