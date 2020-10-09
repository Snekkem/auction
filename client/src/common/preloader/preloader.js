import React from "react";
import preloader from '../../assets/loader.svg';
import css from './preloader.module.css';

let Preloader = () => {
    return <div className={`text-center ${css.loader}`}>
        <img src={preloader} alt={""}/>
    </div>
}

export default Preloader;