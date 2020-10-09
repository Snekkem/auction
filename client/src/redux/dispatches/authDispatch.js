import {toast} from "react-toastify";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import {SET_CURRENT_USER} from "../types/authTypes";
import {authAPI} from "../../apiServices/authApi";
import {ADMIN} from "../../constants";

export const registerUser = (name, email, password) => (dispatch) => {
    return authAPI.Register(name, email, password)
        .then((res) => toast.success(`${res}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
        }))
        .catch((err) => {
                throw toast.error(`${err.response.data}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                })
            }
        )
}

export const setCurrentUserAC = (user, isAdmin) => ({type: SET_CURRENT_USER, payload: {user, isAdmin}})
export const loginUser = (email, password) => (dispatch) => {
    authAPI.Login(email, password).then(res => {
        localStorage.setItem('Token', res.token)
        setAuthToken(res.token)
        const decoded = jwtDecode(res.token)
        dispatch(setCurrentUserAC(decoded, res.role === ADMIN))
    }).catch((err) => {
        toast.error(`${err.response}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
        })
    })
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('Token')
    setAuthToken(false)
    dispatch(setCurrentUserAC(null, null))
}
