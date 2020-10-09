import cssInput from "../../components/auth/Login/login.module.css";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../formsControls/formsControl";
import {required} from "../../utils/validators";

const PlaceABetForm = ({handleSubmit, cancelBet}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field component={Input} validate={[required]} type={'number'} min={"0"}
                   className={`${cssInput.input} my-2 p-1 w-100`} name={"bet"} placeholder={'Bet'}/>
            <div className={'row justify-content-around p-2'}>
                <button type={"submit"} className={'btn btn-success w-50'}>Place a bet</button>
                <button type={"button"} className={'btn btn-danger w-25'} onClick={cancelBet}>Cancel</button>
            </div>
        </form>
    )
}

const PlaceABetReduxForm = reduxForm({
    form: 'placeABet'
})(PlaceABetForm)

export default PlaceABetReduxForm
