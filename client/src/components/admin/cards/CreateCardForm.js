import {Field, reduxForm} from "redux-form";
import {
    FileInput,
    Input,
    renderDropdownList,
    renderMultiselect,
    renderSelectList
} from "../../../common/formsControls/formsControl";
import {required} from "../../../utils/validators";
import React from "react";

const CardForm = ({handleSubmit, submitting, pristine, episodes, locations}) => {
    return <>
        <form onSubmit={handleSubmit} encType={"multipart/form-data"}>
            <div className="form-group">
                <Field name={"cardName"} component={Input} type="text" className="form-control" id="inputName"
                       placeholder="Name" validate={[required]}/>
            </div>
            <div className="form-group">
                <Field
                    name="gender"
                    component={renderSelectList}
                    defaultValue={['Male']}
                    data={['Male', 'Female']}
                />
            </div>
            <div className="form-group">
                <Field
                    name="status"
                    component={renderDropdownList}
                    data={['Alive', 'Dead', 'unknown']}
                    valueField="value"
                    placeholder={'Status'}
                    textField="status"/>
            </div>
            <div className="form-group">
                <Field type="text" component={Input} name={'type'} className="form-control" id="inputType"
                       placeholder="Type" validate={[required]}/>
            </div>
            <div className="custom-file">
                <Field name={"image"} component={FileInput} type="file" className="custom-file-input"
                       id="customFile" validate={[required]}/>
                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
            </div>
            <Field className={'my-3'}
                   name="locations"
                   component={renderMultiselect}
                   placeholder={'Locations'}
                   defaultValue={[]}
                   data={locations.results}/>
            <Field
                name="episodes"
                component={renderMultiselect}
                placeholder={'Episodes'}
                defaultValue={[]}
                data={episodes.results}/>
            <div className={'d-flex justify-content-end mt-3'}>
                <button type="submit" disabled={pristine || submitting}
                        className="btn btn-primary">Submit
                </button>
            </div>
        </form>
    </>
}

const CardReduxForm = reduxForm({
    form: 'card'
})(CardForm)

export default CardReduxForm
