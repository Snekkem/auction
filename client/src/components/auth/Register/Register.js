import React from "react";
import {registerUser} from "../../../redux/dispatches/authDispatch";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {
    email,
    maxLengthCreator,
    minLengthCreator,
    passwordsMatch,
    required
} from "../../../utils/validators";
import {Input} from "../../../common/formsControls/formsControl";
import {useHistory} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import css from './register.module.css'

const maxLength25 = maxLengthCreator(25);
const minLength = minLengthCreator(6);

const RegisterForm = (props) => {
    return (
        <div className={css.formCenter}>
            <form onSubmit={props.handleSubmit}>
                <h3 className={"text-center"}>Sign Up</h3>
                <div className="form-group">
                    <small htmlFor="exampleInputName">Name *</small>
                    <Field type="text" className={`form-control ${css.input}`} id="exampleInputName"
                           aria-describedby="emailHelp" name={"name"}
                           component={Input} validate={[required, maxLength25]}/>
                </div>
                <div className="form-group">
                    <small htmlFor="exampleInputEmail">Email *</small>
                    <Field type="email" className={`form-control ${css.input}`} id="exampleInputEmail"
                           aria-describedby="emailHelp" name={"email"}
                           validate={[required, maxLength25, email]} component={Input}/>
                </div>
                <div className="form-group">
                    <small htmlFor="exampleInputPassword">Password *</small>
                    <Field type="password" className={`form-control ${css.input}`}
                           id="exampleInputPassword" component={Input} name={"password"}
                           validate={[required, maxLength25, minLength]}/>
                </div>
                <div className="form-group">
                    <small htmlFor="exampleInputConfirmPassword">Confirm Password *</small>
                    <Field type="password" className={`form-control ${css.input}`}
                           id="exampleInputConfirmPassword" component={Input} name={"confirmPassword"}
                           validate={[required, maxLength25, passwordsMatch, minLength]}/>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-outline-success">Register</button>
                </div>
            </form>

        </div>
    )
}

const RegisterReduxForm = reduxForm({
    form: 'register'
})(RegisterForm)

const Register = (props) => {
    const history = useHistory()

    function onSubmit(formData) {
        if (formData.password === formData.confirmPassword) {
            props.registerUser(formData.name, formData.email, formData.password)
                .then(() => history.push('/login'))
        }
    }

    return <>
        <RegisterReduxForm onSubmit={onSubmit}/>
    </>
}

export default connect(null, {registerUser})(Register)
