import React, {useEffect, useRef} from "react";
import Possessions from "./possessions";
import {connect} from 'react-redux'
import {getUsersCards} from "../../../redux/dispatches/userDispatch";
import {createAuction} from "../../../redux/dispatches/auctionDispatch";

const PossessionsContainer = (props) => {
    useEffect(() => {
        props.getUsersCards(props.user.id)
    }, [])

    return (
        <Possessions userCards={props.userCards} createAuction={props.createAuction}/>
    )
}

const mapStateToProps = (state) => {
    return {
        userCards: state.userReducer.userCards,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {getUsersCards, createAuction})(PossessionsContainer)
