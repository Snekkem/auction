import React, {useEffect} from "react";
import {appointment, getAllUsers, setIsFetching, userLock} from "../../../redux/dispatches/adminDispatch";
import {connect} from 'react-redux'
import AdminUsers from "./AdminUsers";
import Preloader from "../../../common/preloader/preloader";

const AdminUsersContainer = (props) => {
    useEffect(() => {
        props.setIsFetching(true)
        props.getAllUsers()
    }, [])

    return <>
        {props.isFetching ? <Preloader/> : null}
        <AdminUsers users={props.users}
                    currentUser={props.currentUser}
                    appointment={props.appointment}
                    userLock={props.userLock}
                    getAllUsers={props.getAllUsers}/>
    </>
}

const mapStateToProps = (state) => {
    return {
        users: state.adminReducer.users,
        currentUser: state.authReducer.user,
        isFetching: state.adminReducer.isFetching
    }
}

export default connect(mapStateToProps, {getAllUsers, appointment, userLock, setIsFetching})(AdminUsersContainer)
