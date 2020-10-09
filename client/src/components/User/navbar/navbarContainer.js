import React, {useEffect} from "react";
import Navbar from "./navbar";
import {connect} from "react-redux";
import {logout} from "../../../redux/dispatches/authDispatch";
import {me} from "../../../redux/dispatches/userDispatch";

const NavbarContainer = (props) => {
    useEffect(() => {
        props.me(props.user.id)
    }, [])

    return <Navbar logout={props.logout} rating={props.rating} balance={props.balance}/>
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        balance: state.userReducer.balance,
        rating: state.userReducer.rating
    }
}

export default connect(mapStateToProps, {logout, me})(NavbarContainer)
