import React, {useRef, useState} from "react";
import cssCard from "../../card/card.module.css";
import Modal from "react-modal";
import cssAuction from "./possessions.module.css";
import 'react-widgets/dist/css/react-widgets.css'
import AuctionReduxForm from "../../../common/auction/auctionForm";
import {toast} from "react-toastify";
import {calculateTime} from "../../../common/auction/calculateTime";
import CommonCard from "../../../common/card/card";
import StartAuctionBtn from "../../../common/card/startAuctionBtn";

const Possessions = (props) => {
    let subtitle;
    const [modalAuctionIsOpen, setAuctionOpen] = useState(false);
    const CardId = useRef(null);

    function openAuctionModal(id) {
        CardId.current = id
        setAuctionOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeAuctionModal() {
        setAuctionOpen(false);
    }

    const onAuctionSubmit = values => {
        const sum = calculateTime(values.min_extension_day, values.min_extension_hours, values.min_extension_minutes)

        if (!sum) {
            return toast.error('Fill min extension time', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            })
        }

        props.createAuction({
            start_bet: parseInt(values.start_bet),
            min_step_bet: parseInt(values.min_step_bet),
            max_duration_auctions: new Date(values.max_duration_auctions) - Date.now(),
            min_extension_time: sum,
            max_bet: parseInt(values.max_bet),
            card: CardId.current
        })
    }

    return (
        <div className={'row no-gutters justify-content-around'}>
            {props.userCards.cards && props.userCards.cards.length > 0
                ? props.userCards.cards.map((card, index) =>
                    <div key={index} className={`col-3 ${cssCard.card}`}>
                        <CommonCard card={card} />
                        <StartAuctionBtn openAuctionModal={openAuctionModal.bind(this, card._id)}/>
                    </div>
                ) : <h2 className={'mt-5'}>Card list is empty...</h2>}

            <Modal
                isOpen={modalAuctionIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeAuctionModal}
                className={cssAuction.auctionForm}
                contentLabel="Example Modal"
            >
                <div className={'row no-gutters justify-content-between'}>
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Auction</h2>
                    <button type={"button"} onClick={closeAuctionModal}
                            className={'btn btn-outline-danger rounded-circle h-25'}>X
                    </button>
                </div>
                <AuctionReduxForm onSubmit={onAuctionSubmit}/>
            </Modal>
        </div>
    )
}

export default Possessions
