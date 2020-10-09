import React from 'react';
import css from './login.module.css'
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../common/formsControls/formsControl";
import {email, minLengthCreator, required} from "../../../utils/validators";
import {connect} from "react-redux";
import {loginUser} from "../../../redux/dispatches/authDispatch";

const minLength = minLengthCreator(6);

const LoginForm = (props) => {

    return (
        <div className={`container ${css.formCenter}`}>
            <div className="d-flex flex-column align-items-center mt-4">
                <form onSubmit={props.handleSubmit}>
                    <h3 className="text-center">Sign In</h3>
                    <div className="form-group">
                        <small htmlFor="exampleInputEmail1">Email *</small>
                        <Field type="email" className={`form-control ${css.input}`} id="exampleInputEmail1"
                               aria-describedby="emailHelp" component={Input} name={"email"} required
                               validate={[required, email]}/>
                    </div>
                    <div className="form-group">
                        <small htmlFor="exampleInputPassword1">Password *</small>
                        <Field type="password" required className={`form-control ${css.input}`}
                               id="exampleInputPassword1" component={Input} name={"password"}
                               validate={[required, minLength]}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-outline-success">Sign In</button>
                        <NavLink type="button" className="btn btn-outline-secondary"
                                 to='/register'>Sign Up</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = async (formData) => {
        await props.loginUser(formData.email, formData.password)
    }

    return <div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default connect(null, {loginUser})(Login)
