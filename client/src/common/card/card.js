import React from "react";
import cssCard from "../../components/card/card.module.css";
import {ALIVE, DEAD, UNKNOWN} from "../../constants";

const Card = ({card, showCardInfo, closeCardModal}) => {
    return (
        <div className={'row no-gutters col p-0'}>
            <div className={'col-6 p-0'}>
                <img onMouseEnter={showCardInfo} onMouseLeave={closeCardModal} className={cssCard.cardImg} src={card.image}
                     alt={""}/>
            </div>
            <div className={`col ml-3 ${cssCard.info}`}>
                <h4>{card.name}</h4>
                <div className={'row no-gutters align-items-center'}>
                    {card.status === ALIVE && <div className={'alive'}/>}
                    {card.status === DEAD && <div className={'dead'}/>}
                    {card.status === UNKNOWN && <div className={'unknown'}/>}
                    <div>{card.status}</div>
                </div>
                <div className={'mt-2 text-secondary'}>Type:</div>
                <div>{card.type === '' ? UNKNOWN : card.type}</div>
                <div className={'text-secondary mt-2'}>Gender:</div>
                <div>{card.gender}</div>
            </div>
        </div>
    )
}

export default Card