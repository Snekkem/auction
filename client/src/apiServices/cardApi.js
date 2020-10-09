import * as axios from "axios";
import {toast} from "react-toastify";
import {getDataWithPagination} from "../constants";

export const cardsApi = {
    getAll(pageNumber, pagination) {
            return getDataWithPagination('/api/user/cards', pageNumber, pagination)
                .then(response => response.data)
    },
    createCard(name, status, type, gender, image, locations, episodes) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("status", status);
        formData.append("type", type);
        formData.append("gender", gender);
        formData.append("image", image);
        if (locations && episodes) {
            locations.forEach((location, index) => {
                formData.append(`locations[${index}]`, location._id);
            })

            episodes.forEach((episode, index) => {
                formData.append(`episodes[${index}]`, episode._id);
            })
            return axios.post('/api/admin/create/card', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(response => response.data)
        } else {
            throw toast.error(`Select locations or episodes`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            })
        }

    },
    delete(cardId) {
        return axios.delete(`/api/admin/card/delete/${cardId}`).then(response => response.data)
    },
    update(id, dataToUpdate) {
        const formData = new FormData();
        formData.append("name", dataToUpdate.name);
        formData.append("status", dataToUpdate.status);
        formData.append("type", dataToUpdate.type);
        formData.append("gender", dataToUpdate.gender);
        formData.append("image", dataToUpdate.image);
        for (let i = 0; i < dataToUpdate.locations.length; i++) {
            formData.append(`locations[${i}]`, dataToUpdate.locations[i]._id);
        }
        for (let i = 0; i < dataToUpdate.episodes.length; i++) {
            formData.append(`episodes[${i}]`, dataToUpdate.episodes[i]._id);
        }

        return axios.put(`/api/admin/card/update/${id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => response.data)
    }
}