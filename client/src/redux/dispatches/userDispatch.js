import {
    SET_ALL_SETS,
    SET_BALANCE,
    SET_BET_HISTORY,
    SET_RATING,
    SET_USER_CARDS,
    SET_USER_INFO
} from "../types/userTypes";

import {SET_CHAT, SET_MESSAGE, GET_MESSAGE} from "../types/chatTypes";

import {SET_ALL_CARDS} from "../types/cardTypes";

import {reset} from "redux-form";
import {usersApi} from "../../apiServices/userApi";
import {chatApi} from "../../apiServices/chatApi";
import {cardsApi} from "../../apiServices/cardApi";
import {setsApi} from "../../apiServices/setsApi";

export const setUserCards = (cards) => ({type: SET_USER_CARDS, payload: cards})
export const getUsersCards = (id) => (dispatch) => {
    usersApi.getUserCards(id).then(res => dispatch(setUserCards(res.data)))
}

export const setAllCards = (cards) => ({type: SET_ALL_CARDS, payload: cards})
export const getAllCards = (pageNumber, pagination) => (dispatch) => {
    cardsApi.getAll(pageNumber, pagination).then(res => {
        dispatch(setAllCards(res))
        return res.data.info.currentPage
    })
}

export const setBalance = (balance) => ({type: SET_BALANCE, payload: balance})
export const setRating = (rating) => ({type: SET_RATING, payload: rating})
export const me = (id) => (dispatch) => {
    usersApi.me(id).then(res => {
        dispatch(setBalance(res.data.balance))
        dispatch(setRating(res.data.rating))
    })
}
export const setAllSets = (sets) => ({type: SET_ALL_SETS, payload: sets})
export const getAllSets = () => (dispatch) => {
    setsApi.getAll().then(res => {
        dispatch(setAllSets(res))
    })
}

export const setChat = (chat) => ({type: SET_CHAT, payload: chat})
export const getChat = () => (dispatch) => {
    chatApi.getMessages().then(res => {
        dispatch(setChat(res.data))
    })
}

export const setUserSets = (sets) => ({type: SET_ALL_SETS, payload: sets})
export const getUserSets = (id) => (dispatch) => {
    usersApi.getUserSets(id).then(res => {
        dispatch(setUserSets(res.sets))
    })
}

export const setMessage = (message) => ({type: SET_MESSAGE, payload: message})
export const sendMessage = (userId, message) => (dispatch) => {
    return chatApi.sendMessage(userId, message).then(res => {
        dispatch(setMessage(res.data))
        dispatch(reset('chatForm'))
        return res
    })
}

export const setUserInfo = (user) => ({type: SET_USER_INFO, payload: user})
export const getUserInfo = (id) => (dispatch) => {
    usersApi.me(id).then(res => {
        dispatch(setUserInfo(res.data))
    })
}

export const getMessage = (user, message) => ({type: GET_MESSAGE, payload: {user, message}})

export const setBetHistory = (betHistory) => ({type: SET_BET_HISTORY, payload: betHistory})
export const getBetHistory = (id) => (dispatch) => {
    usersApi.getBetHistory(id).then(res => {
        dispatch(setBetHistory(res.data))
    })
}
