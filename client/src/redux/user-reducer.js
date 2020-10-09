import {
    SET_USER_CARDS,
    SET_BALANCE,
    SET_RATING,
    SET_ALL_SETS,
    SET_USER_INFO,
    SET_BET_HISTORY
} from './types/userTypes'



import {SET_ALL_CARDS} from "./types/cardTypes";
import {GET_MESSAGE, SET_CHAT, SET_MESSAGE} from "./types/chatTypes";

const initialState = {
    userCards: [],
    allCards: [],
    balance: 0,
    rating: 0,
    sets: [],
    chat: [],
    userInfo: null,
    betHistory: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_CARDS: {
            return {
                ...state,
                userCards: action.payload
            }
        }
        case SET_ALL_CARDS: {
            return {
                ...state,
                allCards: action.payload
            }
        }
        case SET_BALANCE: {
            return {
                ...state,
                balance: action.payload
            }
        }
        case SET_RATING: {
            return {
                ...state,
                rating: action.payload
            }
        }
        case SET_ALL_SETS: {
            return {
                ...state,
                sets: action.payload
            }
        }
        case SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.payload
            }
        }
        case SET_BET_HISTORY: {
            return {
                ...state,
                betHistory: action.payload
            }
        }
        case SET_CHAT: {
            return {
                ...state,
                chat: action.payload
            }
        }
        case SET_MESSAGE: {
            return {
                ...state,
                chat: [...state.chat, action.payload]
            }
        }
        case GET_MESSAGE: {
            return {
                ...state,
                chat: [...state.chat, {...action.payload, created_at: new Date()}]
            }
        }
        default:
            return state;
    }
}

export default userReducer
