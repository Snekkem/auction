import {Field, reduxForm} from "redux-form";
import {Input} from "../../../common/formsControls/formsControl";
import React from "react";

const SetForm = ({handleSubmit}) => {
    return (
        <div className={'mx-auto'}>
            <form onSubmit={handleSubmit}>
                <div className={'row no-gutters align-items-center'}>
                    <div className="form-group mb-0">
                        <Field name={"setName"} component={Input} type="text" className="form-control"
                               id="inputName" required
                               placeholder="Name"/>
                    </div>
                    <div className="form-group mb-0 mx-3">
                        <Field name={"bonus"} min="0" component={Input} type="number" className="form-control"
                               id="inputBonus" required
                               placeholder="Bonus"/>
                    </div>
                    <button className={'btn btn-success'}>Create</button>
                </div>
            </form>
        </div>
    )
}

const SetReduxForm = reduxForm({
    form: 'setForm'
})(SetForm)

export default SetReduxForm
