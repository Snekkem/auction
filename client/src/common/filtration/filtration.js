import React from "react";
import css from './filtration.module.css'
import FiltrationReduxFrom from "./filtrationForm";

const Filtration = ({fields, onSubmit, isHide, onOpen}) => {
    return (
        <div className={'position-relative'}>
            <button className={'btn btn-warning'} onClick={onOpen}>Filter</button>
            <div className={`${css.filerContainer} ${isHide && css.visible}`}>
                <span className={'row no-gutters justify-content-center mb-2'}>Filtration</span>
                <FiltrationReduxFrom fields={fields} onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Filtration