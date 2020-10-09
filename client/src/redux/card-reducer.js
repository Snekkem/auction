import {SET_ALL_CARDS} from "./types/cardTypes";

const initialState = {
    cards: []
}

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_CARDS: {
            return {
                ...state,
                cards: action.payload
            }
        }
        default:
            return state;
    }
}



export default cardReducer