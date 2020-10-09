import React, {useState} from "react";
import css from './card.module.css'
import Modal from 'react-modal'
import CommonCard from '../../common/card/card'

const hasUserCard = (card, userCards) => {
    if (userCards && userCards.length > 0) {
        for (const userCard of userCards) {
            if (userCard._id === card._id)
                return true
        }
        return false
    }
}

const Card = ({card, userCards}) => {
    let subtitle;
    const [modalCardIsOpen, setCardOpen] = useState(false);

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeCardModal() {
        setCardOpen(false);
    }

    const showCardInfo = () => {
        setCardOpen(true);
    }

    return (
        <div
            className={`row no-gutters col-3 ${css.card} ${css.cardBrightness} 
            ${hasUserCard(card, userCards.cards) && css.cardNormal}`}>
            <CommonCard card={card} showCardInfo={showCardInfo} closeCardModal={closeCardModal}/>
            <Modal
                isOpen={modalCardIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeCardModal}
                className={css.cardModal}
                overlayClassName={css.cardOverlay}
                contentLabel="Example Modal"
            >
                <div onMouseEnter={showCardInfo} onMouseLeave={closeCardModal}>
                    <div className={'row no-gutters justify-content-between'}>
                        <h2 className={'p-2'} ref={_subtitle => (subtitle = _subtitle)}>Card</h2>
                    </div>
                    <div className={'p-3'}>
                        <div className={'row justify-content-center'}>
                            <img src={card.image} alt={""}/>
                        </div>
                        <h4 className={'text-center'}>{card.name}</h4>
                        <div>Gender: {card.gender}</div>
                        <div>Status: {card.status}</div>
                        <div>Type: {card.type}</div>
                        <div>Locations: {card.locations.map(location => location.name)}</div>
                        <div>Episodes: {card.episodes.map(episode => episode.name)}</div>
                        <div>Created at: {card.created_at}</div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Card
