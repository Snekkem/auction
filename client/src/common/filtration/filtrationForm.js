import React from "react";
import {reduxForm} from "redux-form";


const FiltrationForm = ({handleSubmit, fields}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={'form-group'}>
                {fields}
                <div className={'row no-gutters'}>
                    <button type={'submit'} className={'btn btn-success w-50 mx-auto mt-2'}>OK</button>
                </div>
            </div>
        </form>
    )
}

const FiltrationReduxFrom = reduxForm({
    form: 'filtrationForm'
})(FiltrationForm)

export default FiltrationReduxFrom