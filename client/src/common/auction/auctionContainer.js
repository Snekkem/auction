import React, {useEffect, useRef} from "react";
import Auctions from "./auctions";
import {connect} from "react-redux";
import {getAuctions, placeABet, setBet, setExtensionTime} from "../../redux/dispatches/auctionDispatch";
import {setIsFetching} from "../../redux/dispatches/adminDispatch";
import Preloader from "../preloader/preloader";
import {WS_URL} from "../../constants";

const AuctionContainer = (props) => {
    const ws = useRef(null);
    useEffect(() => {
        props.getAuctions()
        props.setIsFetching(true)
        ws.current = new WebSocket(WS_URL);

        ws.current.onmessage = (evt) => {
            const data = JSON.parse(evt.data)
            if (data.type === 'fetchAuction') {
                props.getAuctions()
            }

            if (data.type === 'extensionTime') {
                props.setExtensionTime(data.auctionId, data.end_auction)
                props.setBet(data.auctionId, data.bet.bet)
            }
        }

        return () => {
            ws.current.close();
        };
    }, [])

    const sendAuctions = (data) => {
        ws.current.send(JSON.stringify({data, type: 'fetchAuction'}))
    }

    const sendExtensionTime = (auctionId, end_auction, bet) => {
        let wsSend = (data) => {
            if (!ws.current.readyState) {
                setTimeout(function () {
                    wsSend(data);
                }, 100);
            } else {
                ws.current.send(JSON.stringify({...data, type: 'extensionTime'}));
            }
        };
        wsSend(auctionId, end_auction, bet);
    }

    return <>
        {props.isFetching ? <Preloader/> : null}
        <Auctions sendAuctions={sendAuctions}
                  auctions={props.auctions}
                  user={props.user}
                  placeABet={props.placeABet}
                  getAuctions={props.getAuctions}
                  sendExtensionTime={sendExtensionTime}
                  setExtensionTime={props.setExtensionTime}/>
    </>
}

const mapStateToProps = (state) => {
    return {
        auctions: state.auctionReducer.auctions,
        user: state.authReducer.user,
        isFetching: state.adminReducer.isFetching
    }
}

export default connect(mapStateToProps, {
    getAuctions,
    setExtensionTime,
    setIsFetching,
    placeABet,
    setBet
})(AuctionContainer)

