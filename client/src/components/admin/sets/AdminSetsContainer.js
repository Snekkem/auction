import React, {useEffect} from "react";
import {getAllSets} from "../../../redux/dispatches/adminDispatch";
import {connect} from 'react-redux'
import AdminSets from "./AdminSets";

const AdminSetsContainer = (props) => {
    useEffect(() => {
        props.getAllSets()
    }, [])

    return <AdminSets getAllSets={props.getAllSets} sets={props.sets}/>
}

const mapStateToProps = (state) => {
    return {
        sets: state.adminReducer.sets
    }
}

export default connect(mapStateToProps, {getAllSets})(AdminSetsContainer)
