import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, renderDateTimePicker} from "../../../common/formsControls/formsControl";
import {minValue,maxValue, required} from "../../../utils/validators";

const AuctionForm = ({handleSubmit, pristine, submitting}) => {
    const minValue0 = minValue(0)
    const maxValue60 = maxValue(60)
    const maxValue24 = maxValue(24)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={"form-group"}>
                    <Field component={Input} validate={[required]} placeholder={'Start Bet'} name={'start_bet'}
                           className="form-control"
                           type={'number'} min={"0"}/>
                </div>
                <div className={"form-group"}>
                    <Field component={Input} validate={[required]} placeholder={'Min Step Bet'} name={'min_step_bet'}
                           className="form-control"
                           type={'number'} min={"0"}/>
                </div>
                <div className={"form-group"}>
                    <small className={'text-dark'}>Max Duration Auction</small>
                    <Field component={renderDateTimePicker} validate={[required]} showTime={true}
                           placeholder={'Max Duration Auction'}
                           className="form-control w-100" name={'max_duration_auctions'}/>
                </div>
                <div className={"form-group row no-gutters justify-content-center"}>
                    <Field name="min_extension_day" type={'number'} valueField={'0'}
                           placeholder={'Day'} min={'0'} max={'24'} validate={[minValue0]}
                           component={Input} defaultValue={['0']}
                    />
                    <Field name="min_extension_hours" type={'number'} className={'mx-5'} valueField={'0'}
                           placeholder={'Hour'} min={'0'} max={'24'} validate={[minValue0, maxValue24]}
                           component={Input} defaultValue={['0']}
                    />
                    <Field validate={[minValue0, maxValue60]} name="min_extension_minutes" type={'number'}
                           placeholder={'Min'} min={'0'} max={'60'}
                           component={Input} defaultValue={['0']}
                    />
                </div>
                <div className={"form-group"}>
                    <Field component={Input} validate={[required]} placeholder={'Max Bet'} name={'max_bet'}
                           className="form-control"
                           type={'number'}/>
                </div>
                <div className={"form-group"}>
                    <button type={'submit'} disabled={pristine || submitting} className={'btn btn-primary mt-3'}>START
                    </button>
                </div>
            </form>
        </div>
    )
}

const AuctionReduxForm = reduxForm({
    form: 'auction'
})(AuctionForm)

export default AuctionReduxForm
