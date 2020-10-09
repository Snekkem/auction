import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators";

const CreateEpisodeForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={`p-1 mt-3 form-control`} validate={[required]} name={"episodeName"} component={"input"}
                   placeholder={"Name"}/>
            <Field className={`p-1 my-3 form-control`} validate={[required]} name={"episode"} component={"input"}
                   placeholder={"Episode"}/>
            <button type={"submit"} disabled={props.pristine || props.submitting}
                    className={'w-100 mt-4 btn btn-primary'}>Create
            </button>
        </form>
    )
}

const CreateEpisodeReduxForm = reduxForm({
    form: 'createEpisode',
})(CreateEpisodeForm)

export default CreateEpisodeReduxForm