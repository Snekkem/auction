import React from "react";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../../../common/formsControls/formsControl";
import FA from 'react-fontawesome'
import css from './chat.module.css'

const chatForm = ({handleSubmit, pristine, submitting}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={'row justify-content-center'}>
                    <Field name={'message'} type={'textarea'} placeholder={'Message...'} component={TextArea}
                           className={css.textArea} />
                    <button type={'submit'} disabled={pristine || submitting}
                            className={`${css.btnSubmit} btn btn-primary`}><FA name={'fas fa-paper-plane'}/>
                    </button>
                </div>
            </form>
        </div>
    )
}

const ChatReduxForm = reduxForm({
    form: 'chatForm'
})(chatForm)

export default ChatReduxForm
