import React, {useEffect, useState} from "react";
import css from './auction.module.css'
import PlaceABetReduxForm from "./placeABetForm";
import AuctionTimer from "../auctionTimer/auctionTimer";
import {ADMIN} from "../../constants";

const Auction = ({allInfo, user, placeABet, setExtensionTime,sendAuctions, sendExtensionTime}) => {
    const [isPlaceAaBet, setPlaceABet] = useState(false)

    const placeBet = () => {
        setPlaceABet(true)
    }

    const cancelBet = () => {
        setPlaceABet(false)
    }


    const onSubmit = values => {
        setPlaceABet(false)
        placeABet(allInfo._id, user.id, values.bet)
            .then((data) => {
                sendExtensionTime({
                    auctionId: allInfo._id,
                    end_auction: data.data.auction.end_auction,
                    bet: {bet: parseInt(values.bet)}
                })
                setExtensionTime(allInfo._id, data.data.auction.end_auction)
            })
    }

    return (
        <>
            {allInfo &&
            <div className={`${css.auction} ${allInfo.owner.role === ADMIN && css.adminBorder}`}>
                <div className={`d-flex no-gutters justify-content-between`}>
                    <small>{allInfo.owner.name}</small>
                    <small>{new Date(allInfo.created_at).toLocaleString()}</small>
                </div>
                <div className={'row justify-content-center my-2'}>
                    <img src={allInfo.card.image} alt={""}/>
                </div>
                <h5 className={'text-center'}>{allInfo.card.name}</h5>
                <div className={'d-flex no-gutters justify-content-between'}>
                    <small>Current rate</small>
                    <small>{allInfo.lastBet ? allInfo.lastBet.bet : 0}</small>
                </div>
                <div className={'d-flex no-gutters justify-content-between'}>
                    <small>Min rate</small>
                    <small>{allInfo.min_step_bet}</small>
                </div>
                <div className={'d-flex no-gutters justify-content-between'}>
                    <small>Max rate</small>
                    {allInfo.max_bet}
                </div>
                <div className={'d-flex no-gutters justify-content-between'}>
                    <small>Time to end</small>
                    <small><AuctionTimer userId={user.id} sendAuctions={sendAuctions}
                                         time={Math.floor((new Date(allInfo.end_auction).getTime() - Date.now()) / 1000)}/></small>
                </div>
                {user.role === ADMIN ? '' :
                    allInfo.owner && user.id === allInfo.owner._id ?
                        <h5 className={'text-center mb-0 mt-3 p-1'}>Your auction</h5> :
                        <div>
                            {isPlaceAaBet ? <div>
                                    <PlaceABetReduxForm cancelBet={cancelBet} onSubmit={onSubmit}/>
                                </div>
                                :
                                <div className={'mt-3 d-flex no-gutters justify-content-between'}>
                                    <button className={'btn btn-warning w-100'}
                                            onClick={() => placeBet(allInfo._id)}>Place a
                                        bet
                                    </button>
                                </div>}
                        </div>
                }
            </div>
            }
        </>
    )
}

export default Auction
