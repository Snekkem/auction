import {SET_ALL_CARDS} from "../types/cardTypes";
import {cardsApi} from "../../apiServices/cardApi";

export const setAllCards = (cards) => ({type: SET_ALL_CARDS, payload: cards})
export const getAllCards = (pageNumber, pagination) => (dispatch) => {
    cardsApi.getAll(pageNumber, pagination).then(res => {
        dispatch(setAllCards(res.data))
    })
}
