import React, {useEffect} from "react";
import {getStatistics, setIsFetching} from "../../../redux/dispatches/adminDispatch";
import {connect} from 'react-redux'
import AdminStatistics from "./AdminStatistics";
import Preloader from "../../../common/preloader/preloader";

const AdminStatisticsContainer = (props) => {
    useEffect(() => {
        props.setIsFetching(true)
        props.getStatistics()
    }, [])

    return <>
        {props.isFetching ? <Preloader/> : null}
        <AdminStatistics statistics={props.statistics}/>
    </>
}

const mapStateToProps = (state) => {
    return {
        statistics: state.adminReducer.statistics,
        isFetching: state.adminReducer.isFetching
    }
}

export default connect(mapStateToProps, {getStatistics, setIsFetching})(AdminStatisticsContainer)