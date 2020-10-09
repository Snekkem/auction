import React from "react";
import css from './set.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {defaultSliderSettings} from "../../../constants";

const AdminSet = ({setInfo}) => {
    return (
        <>
            <div className={'col-2'}/>
            <div className={'flex-column my-3'}>

                <h4 className={'text-center'}>{setInfo.set_name} - {setInfo.bonus} CP</h4>
                <div className={'row no-gutters'}>
                    <Slider {...defaultSliderSettings}>
                        {setInfo.set.map(card => <div className={`mr-3`}>
                                <div className={`${css.cardImg} row no-gutters justify-content-center`}>
                                    <img src={card.image} alt={""}/>
                                </div>
                                <h4 className={'text-center'}>{card.name}</h4>
                            </div>
                        )}
                    </Slider>
                </div>
                <div className={'text-right my-2'}>Created at: {new Date(setInfo.created_at).toLocaleString()}</div>
                <hr className={'bg-white'}/>
            </div>
        </>
    )
}

export default AdminSet