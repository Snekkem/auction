import React from "react";
import css from './admin.module.css'
import {NavLink} from "react-router-dom";
import FA from 'react-fontawesome'

const Admin = (props) => {
    return (
        <div className={`row no-gutters`}>
            <aside style={{zIndex: 9999}} className={`col-2 bg-dark ${css.menu}`}>
                <h3 className={`text-center py-2`}>Dashboard</h3>
                <hr className={'bg-white'}/>
                <div className={'d-flex flex-column'}>
                    <NavLink to={'/admin/statistics'} className={`${css.menuItem} row no-gutters`}>
                        <FA
                            className={"d-flex align-self-center mr-2 fas fa-project-diagram"}
                            name="fas fa-project-diagram"
                            size="1g"
                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                        />Statistics</NavLink>
                    <NavLink to={'/admin/users'} className={`${css.menuItem} row no-gutters`}>
                        <FA
                            className="d-flex align-self-center mr-2 fas fa-users"
                            name="location"
                            size="1g"
                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                        />Users</NavLink>
                    <NavLink to={'/admin/cards'} className={`${css.menuItem} row no-gutters`}>
                        <FA
                            className="d-flex align-self-center mr-2 far fa-address-card"
                            name="card"
                            size="1g"
                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                        />Cards</NavLink>
                    <NavLink to={'/admin/sets'} className={`${css.menuItem} row no-gutters`}>
                        <FA
                            className="d-flex align-self-center mr-2 far fas fa-sliders-h"
                            name="sets"
                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                        />Sets</NavLink>
                    <NavLink to={'/admin/locations'} className={`${css.menuItem} row no-gutters`}>
                        <FA
                            className="d-flex align-self-center mr-2 fas fa-tram"
                            name="location"
                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                        />Locations</NavLink>
                    <NavLink to={'/admin/episodes'} className={`${css.menuItem} row no-gutters`}>
                        <FA
                            className="d-flex align-self-center mr-2 far fa-image"
                            name="episode"
                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                        />Episodes</NavLink>
                    <NavLink to={'/admin/auction'} className={`${css.menuItem} row no-gutters`}>
                        <FA
                            className="d-flex align-self-center mr-2 fas fa-gavel"
                            name="auction"
                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                        />Auctions</NavLink>
                    <button className={css.menuItem + ' ' + css.logout} onClick={() => {
                        props.logout()
                    }}>
                        <FA
                            className="d-flex align-self-center mr-2 fas fa-sign-out"
                            name="logout"
                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                        /><span>Logout</span>
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default Admin