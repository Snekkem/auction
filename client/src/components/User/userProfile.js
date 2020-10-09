import React from "react";
import Avatar from 'react-avatar';
import css from './userProfile.module.css'

const UserProfile = (props) => {
    return (
        <div className={'container mt-3'}>
            <div className={'row no-gutters'}>
                <div className={css.image}>
                    <Avatar
                        name={props.user.name}
                        color={Avatar.getRandomColor('sitebase', ['red', 'green'])} size="250"/>
                </div>
                <div>
                    <div className={css.userInfo}>Name: <span>{props.user.name}</span></div>
                    <div className={`mt-2 ${css.userInfo}`}>Email: <span>{props.userInfo && props.userInfo.email}</span>
                    </div>
                    <div className={`mt-2 ${css.userInfo}`}>Role: <span>{props.user.role}</span></div>
                    <div
                        className={`mt-2 ${css.userInfo}`}>Rating: <span>{props.userInfo && props.userInfo.rating}</span>
                    </div>
                    <div className={`mt-2 ${css.userInfo}`}>Created
                        at: <span>{props.userInfo && new Date(props.userInfo.created_at).toLocaleString()}</span></div>
                </div>
            </div>
            <h3 className={'mb-1 mt-2 title'}>Bet history</h3>
            <div className={'separator'}/>
            <div>
                {props.betHistory && props.betHistory.length > 0 ? props.betHistory.map(bet =>
                    bet &&
                    <div key={bet._id}>
                        <div
                            className={`${bet.auction.owner._id === props.user.id ? 'text-success' : 'text-danger'} mt-2`}>
                            {bet.user.name} -> {bet.auction.owner.name} -> {bet.bet} CP
                        </div>
                        <div>
                            Card: {bet.auction.card.name}
                        </div>
                        <div>
                            Date: {new Date(bet.created_at).toLocaleString()}
                        </div>
                        <div className={'separator'}/>
                    </div>
                ) : <h3 className={'mt-3'}>History is empty...</h3>}
            </div>
        </div>
    )
}

export default UserProfile
