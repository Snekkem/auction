import React, {useEffect} from "react";
import {getAllCards} from "../../../redux/dispatches/cardDispatch";
import {connect} from "react-redux";
import {getUsersCards} from "../../../redux/dispatches/userDispatch";
import Cards from "../../card/Cards";

const FaqContainer = (props) => {
    useEffect(() => {
        props.getAllCards()
        props.getUsersCards(props.user.id)
    }, [])

    return (
        <Cards cards={props.cards} getAllCards={props.getAllCards} userCards={props.userCards}/>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.userReducer.allCards,
        userCards: state.userReducer.userCards,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {getAllCards, getUsersCards})(FaqContainer)
