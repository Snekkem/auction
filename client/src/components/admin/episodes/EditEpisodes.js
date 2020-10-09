import React from 'react'
import FA from "react-fontawesome";
import {Field, reduxForm} from "redux-form";
import css from '../../auth/Login/login.module.css'
import {required} from "../../../utils/validators";

const EditForm = ({handleSubmit, episode}) => {
    return (
        <>
            <form id={`form-${episode._id}`} onSubmit={handleSubmit}/>
            <th>
                <Field form={`form-${episode._id}`} className={`${css.input} p-1`} name={"name"}
                       component={'input'} type={'text'} validate={[required]} placeholder={"Name"}/>
            </th>
            <th>
                <Field form={`form-${episode._id}`} validate={[required]} className={`${css.input} p-1`}
                       name={"episode"}
                       component={"input"}
                       placeholder={"Episode"}/>
            </th>
            <th></th>
            <th>
                <button form={`form-${episode._id}`}
                        style={{width: 38, height: 30}}
                        type={"submit"}
                        className={'btn mx-3 p-1 btn-success'}>
                    <FA className="fas fa-check" name="check"/></button>
            </th>
        </>
    )
}


const ReduxForm = reduxForm({
    form: 'editEpisodes'
})(EditForm)

export default ReduxForm
