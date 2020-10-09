import {
    SET_ALL_USERS,
    SET_USER_STATUS,
    SET_ALL_LOCATIONS_AFTER_UPDATE,
    SET_ALL_EPISODES_AFTER_UPDATE,
    SET_STATISTICS,
    SET_CARDS_AFTER_UPDATE,
    SET_CARDS_AFTER_DELETE,
    SET_SELECTED_CARD,
    REMOVE_SELECTED_CARD,
    SET_IS_FETCHING, CLEAR_SELECTED_CARD
} from './types/adminTypes'

import {
    SET_ALL_SETS,
    SET_ALL_CARDS,
    SET_ALL_LOCATIONS,
    SET_ALL_EPISODES
} from './types/cardTypes'

const initialState = {
    users: [],
    cards: [],
    locations: [],
    episodes: [],
    sets: [],
    statistics: [],
    isFetching: false,
    selectedCards: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                users: {
                    ...state.users,
                    results: state.users.results.map(user => user._id === action.payload.id ? {
                        ...user,
                        is_active: action.payload.is_active
                    } : user)
                }
            }
        }
        case SET_ALL_LOCATIONS: {
            return {
                ...state,
                locations: action.payload
            }
        }
        case SET_ALL_LOCATIONS_AFTER_UPDATE: {
            return {
                ...state,
                locations: {
                    ...state.locations,
                    results: state.locations.results.map(location => location._id === action.payload._id ? action.payload : location)
                }
            }
        }
        case SET_ALL_EPISODES: {
            return {
                ...state,
                episodes: action.payload
            }
        }
        case SET_ALL_EPISODES_AFTER_UPDATE: {
            return {
                ...state,
                episodes: {
                    ...state.episodes,
                    results: state.episodes.results.map(episode => episode._id === action.payload._id ? action.payload : episode)
                }
            }
        }
        case SET_ALL_CARDS: {
            return {
                ...state,
                cards: action.payload
            }
        }
        case SET_ALL_SETS: {
            return {
                ...state,
                sets: action.payload
            }
        }
        case SET_STATISTICS: {
            return {
                ...state,
                statistics: action.payload
            }
        }
        case SET_SELECTED_CARD: {
            return {
                ...state,
                selectedCards: [...state.selectedCards, action.payload]
            }
        }
        case REMOVE_SELECTED_CARD: {
            return {
                ...state,
                selectedCards: state.selectedCards.filter(sCard => sCard !== action.payload)
            }
        }
        case SET_CARDS_AFTER_UPDATE: {
            return {
                ...state,
                cards: {
                    ...state.cards,
                    results: state.cards.results.map(card => card._id === action.payload._id ? action.payload : card)
                }
            }
        }
        case CLEAR_SELECTED_CARD: {
            return {
                ...state,
                selectedCards: []
            }
        }
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.payload
            }
        }
        default:
            return state;
    }
}


export default adminReducer
