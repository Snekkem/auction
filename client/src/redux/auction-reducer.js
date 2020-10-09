import {SET_AUCTION, SET_AUCTIONS, SET_BET, SET_EXTENSION_TIME} from './types/auctionTypes'

const initialState = {
    auctions: [],
    bets: []
}

const auctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUCTIONS: {
            return {
                ...state,
                auctions: action.payload
            }
        }
        case SET_BET: {
            return {
                ...state,
                auctions: {
                    ...state.auctions,
                    results: state.auctions.results.map(item => item._id === action.payload.auctionId ? {
                        ...item,
                        lastBet: {...item.lastBet, bet: action.payload.bet}
                    } : item)
                }
            }
        }
        case SET_AUCTION: {
            return {
                ...state,
                auctions: [state.auctions, action.payload]
            }
        }
        case SET_EXTENSION_TIME: {
            return {
                ...state,
                auctions: {
                    ...state.auctions,
                    results: state.auctions.results.map(item => item._id === action.payload.auctionId ? {
                        ...item, end_auction: action.payload.extensionTime
                    } : item)
                }
            }
        }
        default:
            return state;
    }
}

export default auctionReducer
