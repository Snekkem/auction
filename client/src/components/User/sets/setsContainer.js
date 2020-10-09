import React, {useEffect} from "react";
import { getUserSets} from "../../../redux/dispatches/userDispatch";
import {connect} from 'react-redux'
import Sets from "./sets";

const SetsContainer = (props) => {
    useEffect(() => {
        props.getUserSets(props.user.id)
    }, [])

    return <Sets sets={props.sets}/>
}

const mapStateToProps = (state) => {
    return {
        sets: state.userReducer.sets,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {getUserSets})(SetsContainer)
