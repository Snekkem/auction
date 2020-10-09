import {toast} from "react-toastify";
import {jsUcfirst} from "./capitalizeFirstLetter";

export const successToast = (message) => {
    toast.success(`${jsUcfirst(message)}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
    })
}

export const errorToast = (message) => {
    toast.error(`${message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
    })
}