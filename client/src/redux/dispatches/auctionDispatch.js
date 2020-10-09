import {SET_AUCTION, SET_AUCTIONS, SET_BET, SET_EXTENSION_TIME} from "../types/auctionTypes";
import {reset} from "redux-form";
import {auctionApi} from "../../apiServices/auctionApi";
import {setIsFetching} from "./adminDispatch";
import {errorToast, successToast} from "../../common/toasts";
import {jsUcfirst} from "../../common/capitalizeFirstLetter";

export const setAllAuction = (auctions) => ({type: SET_AUCTIONS, payload: auctions})
export const getAuctions = (pageNumber, pagination, filter) => (dispatch) => {
    return auctionApi.getAuctions(pageNumber, pagination, filter).then(res => {
        dispatch(reset('filtrationForm'))
        dispatch(setAllAuction(res.data))
        dispatch(setIsFetching(false))
    }).catch((err) => {
        throw errorToast(err.message)
    })
}


export const setExtensionTime = (auctionId, extensionTime) => ({
    type: SET_EXTENSION_TIME,
    payload: {auctionId, extensionTime}
})

export const setBet = (auctionId, bet) => ({type: SET_BET, payload: {auctionId, bet}})
export const placeABet = (auction, user, bet) => (dispatch) => {
    return auctionApi.placeABet(auction, user, bet).then(res => {
        if (res) {
            dispatch(setBet(auction, bet))
            successToast(jsUcfirst(res.status))
        }
        return res
    }).catch((err) => {
            throw errorToast(err.response ? err.response.data : err.message)
        }
    )
}

export const setAuction = (auction) => ({type: SET_AUCTION, payload: auction})
export const createAuction = (auctionData) => () => {
    return auctionApi.createAuction(auctionData).then(res => {
        if (res)
            successToast(res.status)
    }).catch((err) => {
            throw errorToast(err.response.data)
        }
    )
}
