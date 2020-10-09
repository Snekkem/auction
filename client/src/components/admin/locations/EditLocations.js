import React from 'react'
import FA from "react-fontawesome";
import {Field, reduxForm} from "redux-form";
import css from '../../auth/Login/login.module.css'
import {required} from "../../../utils/validators";
import {Input} from "../../../common/formsControls/formsControl";

const EditForm = ({handleSubmit, location}) => {
    return (
        <>
            <form id={`form-${location._id}`} onSubmit={handleSubmit}/>
            <th>
                <Field form={`form-${location._id}`} className={`${css.input} p-1`} name={"name"}
                       component={Input} type={'text'} validate={[required]} placeholder={"Name"}/>
            </th>
            <th>
                <Field form={`form-${location._id}`} validate={[required]} className={`${css.input} p-1`} name={"type"}
                       component={Input}
                       placeholder={"Type"}/>
            </th>
            <th>
                <Field form={`form-${location._id}`} validate={[required]} className={`${css.input} p-1`}
                       name={"dimension"} component={Input}
                       placeholder={"Dimension"}/>
            </th>
            <th>
                <button form={`form-${location._id}`}
                        style={{width: 38, height: 30}}
                        type={"submit"}
                        className={'btn mx-3 p-1 btn-success'}>
                    <FA
                        className="fas fa-check"
                        name="check"
                    /></button>
            </th>
        </>
    )
}


const ReduxForm = reduxForm({
    form: 'editLocations'
})(EditForm)

export default ReduxForm
