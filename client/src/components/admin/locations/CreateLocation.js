import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators";
import {Input} from "../../../common/formsControls/formsControl";

const CreateEpisodeForm = (props) => {
    return (<form onSubmit={props.handleSubmit}>
            <Field className={`p-1 mt-3 form-control`} validate={[required]} name={"locationName"} component={Input}
                   placeholder={"Name"}/>
            <Field className={`p-1 mt-3 form-control`} validate={[required]} name={"type"} component={Input}
                   placeholder={"Type"}/>
            <Field className={`p-1 mt-3 form-control`} validate={[required]} name={"dimension"} component={Input}
                   placeholder={"Dimension"}/>
            <button type={"submit"} disabled={props.pristine || props.submitting}
                    className={'w-100 mt-4 btn btn-primary'}>Create
            </button>
        </form>
    )
}

const CreateLocationReduxForm = reduxForm({
    form: 'createLocation',
})(CreateEpisodeForm)

export default CreateLocationReduxForm
