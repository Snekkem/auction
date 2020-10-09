import React, {useEffect} from "react";
import {getBetHistory, getUserInfo, getUsersCards} from "../../redux/dispatches/userDispatch";
import UserProfile from "./userProfile";
import {connect} from 'react-redux'

const UserProfileContainer = (props) => {
    useEffect(() => {
        props.getUserInfo(props.user.id)
        props.getUsersCards(props.user.id)
        props.getBetHistory(props.user.id)
    }, [])
    return (
        <UserProfile betHistory={props.betHistory} userInfo={props.userInfo} userCards={props.userCards} user={props.user}/>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        userInfo: state.userReducer.userInfo,
        userCards: state.userReducer.userCards,
        betHistory: state.userReducer.betHistory
    }
}

export default connect(mapStateToProps, {getUserInfo, getUsersCards, getBetHistory})(UserProfileContainer)