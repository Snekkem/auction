import React, {useEffect, useRef} from "react";
import {
    createCard,
    createSet,
    deleteCard,
    getAllCards,
    getAllEpisodes,
    getAllLocations, setIsFetching,
    setRemoveCard,
    setSelectedCard,
    updateCard,
    clearSelectedCard
} from "../../../redux/dispatches/adminDispatch";

import {connect} from 'react-redux'
import AdminCards from "./AdminCards";
import {withRouter} from "react-router-dom";
import {createAuction} from "../../../redux/dispatches/auctionDispatch";
import Preloader from "../../../common/preloader/preloader";
import {WS_URL} from "../../../constants";

const AdminUsersContainer = (props) => {
    const ws = useRef(null);
    useEffect(() => {
        props.getAllCards()
        props.getAllEpisodes()
        props.getAllLocations()
        props.setIsFetching(true)

        ws.current = new WebSocket(WS_URL);

        return () => {
            ws.current.close();
        };
    }, [])

    const sendAuctions = (data) => {
        ws.current.send(JSON.stringify({data, type: 'fetchAuction'}))
    }

    return <>
        {props.isFetching ? <Preloader/> : null}
        <AdminCards createCard={props.createCard}
                    createSet={props.createSet}
                    cards={props.cards}
                    sendAuctions={sendAuctions}
                    deleteCard={props.deleteCard}
                    updateCard={props.updateCard}
                    episodes={props.episodes}
                    getAllCards={props.getAllCards}
                    locations={props.locations}
                    setRemoveCard={props.setRemoveCard}
                    setSelectedCard={props.setSelectedCard}
                    selectedCards={props.selectedCards}
                    createAuction={props.createAuction}
                    clearSelectedCard={props.clearSelectedCard}/>
    </>
}

const mapStateToProps = (state) => {
    return {
        cards: state.adminReducer.cards,
        episodes: state.adminReducer.episodes,
        locations: state.adminReducer.locations,
        selectedCards: state.adminReducer.selectedCards,
        isFetching: state.adminReducer.isFetching
    }
}

const cardsWithRouter = withRouter(AdminUsersContainer)

export default connect(mapStateToProps, {
    getAllCards,
    getAllEpisodes,
    getAllLocations,
    createCard,
    createSet,
    deleteCard,
    updateCard,
    createAuction,
    setSelectedCard,
    setRemoveCard,
    setIsFetching,
    clearSelectedCard
})(cardsWithRouter)
