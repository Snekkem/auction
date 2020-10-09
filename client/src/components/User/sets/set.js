import React from "react";
import cssSet from './set.module.css'
import cssCard from '../../card/card.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {defaultSliderSettings} from "../../../constants";

const Set = ({allInfo}) => {
    return (
        <>
            <div className={'flex-column my-3'}>
                <h4 className={'text-center'}>{allInfo.setId.set_name} - {allInfo.setId.bonus} CP</h4>
                <div className={'row no-gutters'}>
                    <Slider {...defaultSliderSettings}>
                        {allInfo.isCards.map(info => <div key={info.cardId.id}
                                                          className={`mr-3 ${!info.isCard && cssCard.cardBrightness}`}>
                                <div className={`${cssSet.cardImg} row no-gutters justify-content-center`}>
                                    <img src={info.cardId.image} alt={""}/>
                                </div>
                                <h4 className={'text-center'}>{info.cardId.name}</h4>
                            </div>
                        )}
                    </Slider>
                </div>
                <div className={'text-right my-2'}>Created
                    at: {new Date(allInfo.setId.created_at).toLocaleString()}</div>
                <div className={'separator'}/>
            </div>
        </>
    )
}

export default Set