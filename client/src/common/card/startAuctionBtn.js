import React from "react";
import cssCard from "../../components/card/card.module.css";

const StartAuctionBtn = ({openAuctionModal}) => {
    return (
        <div>
            <button className={`btn-start ${cssCard.glowOnHover}`}
                    onClick={openAuctionModal}>START
                AUCTION
            </button>
        </div>
    )
}

export default StartAuctionBtn