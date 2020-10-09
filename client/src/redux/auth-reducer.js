import {SET_CURRENT_USER} from "./types/authTypes";

const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !!action.payload.user,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin
            }
        }
        default:
            return state;
    }
}


export default authReducer