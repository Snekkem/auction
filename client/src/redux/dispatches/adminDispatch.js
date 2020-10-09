import {cardsApi} from '../../apiServices/cardApi'
import {setsApi} from '../../apiServices/setsApi'
import {locationsApi} from "../../apiServices/locationsApi";
import {episodesApi} from "../../apiServices/episodesApi";
import {usersApi} from "../../apiServices/userApi";
import {adminApi} from "../../apiServices/adminApi";

import {
    SET_ALL_USERS,
    SET_USER_STATUS,
    SET_ALL_LOCATIONS_AFTER_DELETED,
    SET_ALL_LOCATIONS_AFTER_UPDATE,
    SET_LOCATION,
    SET_ALL_EPISODES_AFTER_DELETED,
    SET_ALL_EPISODES_AFTER_UPDATE,
    SET_EPISODE,
    SET_STATISTICS,
    SET_CARDS_AFTER_UPDATE,
    SET_CARDS_AFTER_DELETE,
    SET_CARD,
    SET_IS_FETCHING,
    SET_SELECTED_CARD,
    REMOVE_SELECTED_CARD,
    CLEAR_SELECTED_CARD
} from '../types/adminTypes'

import {
    SET_ALL_SETS,
    SET_ALL_CARDS,
    SET_ALL_LOCATIONS,
    SET_ALL_EPISODES
} from '../types/cardTypes'
import {errorToast, successToast} from "../../common/toasts";

export const setAllUsers = (users) => ({type: SET_ALL_USERS, payload: users})
export const getAllUsers = (pageNumber, pagination) => (dispatch) => {
    return usersApi.getAll(pageNumber, pagination).then(res => {
        dispatch(setAllUsers(res.data))
        dispatch(setIsFetching(false))
        return res.data.info.currentPage
    }).catch(err => {
        throw errorToast(err.message)
    })
}

export const setAllCards = (cards) => ({type: SET_ALL_CARDS, payload: cards})
export const getAllCards = (pageNumber, pagination) => (dispatch) => {
    return cardsApi.getAll(pageNumber, pagination).then(res => {
        dispatch(setAllCards(res.data))
        dispatch(setIsFetching(false))
        return res.data.info.currentPage
    }).catch(err => {
        throw errorToast(err.message)
    })
}

export const createCard = (name, status, type, gender, image, locations, episodes) => (dispatch) => {
    return cardsApi.createCard(name, status, type, gender, image, locations, episodes)
        .then(res => {
            successToast(res.status)
        }).catch(err => {
            throw errorToast(err.message)
        })
}

export const setCardsAfterUpdate = (card) => ({type: SET_CARDS_AFTER_UPDATE, payload: card})
export const updateCard = (id, card) => (dispatch) => {
    return cardsApi.update(id, card).then(res => {
        dispatch(setCardsAfterUpdate(res.data))
        if (res)
            successToast(res.status)
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const deleteCard = (cardId) => () => {
    return cardsApi.delete(cardId).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const setAllLocations = (locations) => ({type: SET_ALL_LOCATIONS, payload: locations})
export const getAllLocations = (pageNumber, pagination) => (dispatch) => {
    return locationsApi.getAll(pageNumber, pagination).then(res => {
        dispatch(setAllLocations(res.data))
        dispatch(setIsFetching(false))
        return res.data.info.currentPage
    }).catch((err) => {
        throw errorToast(err.message)
    })
}

export const createLocation = (name, type, dimension) => () => {
    return locationsApi.create(name, type, dimension).then(res => {
        if (res.status)
            successToast(res.status)
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const setLocationsAfterUpdate = (updatedData) => ({
    type: SET_ALL_LOCATIONS_AFTER_UPDATE, payload: updatedData
})
export const updateLocation = (id, updatedData) => (dispatch) => {
    locationsApi.update(id, updatedData).then(res => {
        dispatch(setLocationsAfterUpdate(res.data))
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const deleteLocation = (id) => () => {
    return locationsApi.deleteById(id).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const setAllEpisodes = (episodes) => ({type: SET_ALL_EPISODES, payload: episodes})
export const getAllEpisodes = (pageNumber, pagination) => (dispatch) => {
    return episodesApi.getAll(pageNumber, pagination).then(res => {
        dispatch(setAllEpisodes(res.data))
        dispatch(setIsFetching(false))
        return res.data.info.currentPage
    }).catch((err) => {
            throw errorToast(err.message)
        }
    )
}

export const deleteEpisode = (id) => () => {
    return episodesApi.deleteById(id).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const setEpisodesAfterUpdate = (updatedData) => ({
    type: SET_ALL_EPISODES_AFTER_UPDATE, payload: updatedData
})
export const updateEpisode = (id, updatedData) => (dispatch) => {
    episodesApi.update(id, updatedData).then(res => {
        dispatch(setEpisodesAfterUpdate(res.data))
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const createEpisode = (name, episode) => (dispatch) => {
    return episodesApi.create(name, episode).then(res => {
        if (res.status)
            successToast(res.status)
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const appointment = (userId, role) => () => {
    usersApi.appointment(userId, role)
}

export const setUserStatus = (is_active, id) => ({type: SET_USER_STATUS, payload: {is_active, id}})
export const userLock = (userId) => (dispatch) => {
    usersApi.userLock(userId).then(res => {
        dispatch(setUserStatus(res.data.is_active, userId))
        if (res.data)
            successToast(res.data.is_active ? 'User Unlocked!' : 'User Blocked!')
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const setAllSets = (sets) => ({type: SET_ALL_SETS, payload: sets})
export const getAllSets = (pageNumber, pagination) => (dispatch) => {
    setsApi.getAll(pageNumber, pagination).then(res => {
        dispatch(setAllSets(res.data))
        dispatch(setIsFetching(false))
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const createSet = (set_name, set, bonus) => () => {
    return setsApi.createSet(set_name, set, bonus).then(res => {
        if (res.status)
            successToast(res.status)
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const setStatistics = (statistics) => ({type: SET_STATISTICS, payload: statistics})
export const getStatistics = () => (dispatch) => {
    adminApi.getStatistics().then(res => {
        dispatch(setStatistics(res.data))
        dispatch(setIsFetching(false))
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}

export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, payload: isFetching})
export const setSelectedCard = (cardId) => ({type: SET_SELECTED_CARD, payload: cardId})
export const setRemoveCard = (cardId) => ({type: REMOVE_SELECTED_CARD, payload: cardId})
export const clearSelectedCard = () => ({type: CLEAR_SELECTED_CARD})
