import React from "react";
import './statistics.css'

const AdminStatistics = (props) => {
    return (
        <div className={'row no-gutters justify-content-end mt-5 '}>
            <div className={'col-2'}/>
            <h2 className={'col-3 stat-block'}>
                <div>{props.statistics.Cards}</div>
                <div>Cards</div>
            </h2>
            <h2 className={'col-3 stat-block'}>
                <div>{props.statistics.Sets}</div>
                <div>Sets</div>
            </h2>
            <h2 className={'col-3 stat-block'}>
                <div>{props.statistics.Users}</div>
                <div>Users</div>
            </h2>
        </div>
    )
}

export default AdminStatistics