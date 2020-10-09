import React, {useEffect} from "react";
import {getAllCards} from "../../redux/dispatches/cardDispatch";
import {connect} from 'react-redux'
import Card from "./Card";

const CardContainer = (props) => {
    useEffect(() => {
       props.getAllCards()
    }, [])

    return <Card cards={props.cards} userCards={props.userCards}/>
}

const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards
    }
}

export default connect(mapStateToProps, {getAllCards})(CardContainer)
