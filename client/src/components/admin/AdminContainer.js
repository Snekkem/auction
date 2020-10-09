import React, {useEffect} from "react";
import Admin from './Admin'
import {getAllUsers} from "../../redux/dispatches/adminDispatch";
import {connect} from 'react-redux'
import {logout} from "../../redux/dispatches/authDispatch";

const AdminContainer = (props) => {
    useEffect(() => {
        props.getAllUsers()
    }, [])

    return <Admin users={props.users} logout={props.logout}/>
}

const mapStateToProps = (state) => {
    return {
        users: state.adminReducer.users
    }
}

export default connect(mapStateToProps, {getAllUsers, logout})(AdminContainer)