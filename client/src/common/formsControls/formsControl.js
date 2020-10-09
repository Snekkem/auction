import React from "react";
import css from './formsControl.module.css';
import Multiselect from 'react-widgets/lib/Multiselect'
import SelectList from 'react-widgets/lib/SelectList'
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from "react-widgets-moment";

momentLocalizer(moment)

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return <div className={css.formControl + ' ' + (hasError ? css.error : '')}>
        <div>
            <input {...input} {...props}  />
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}


export const TextArea = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return <div className={css.formControl + ' ' + (hasError ? css.error : '')}>
        <div>
            <textarea {...input} {...props}  />
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}

const adaptFileEventToValue = delegate => e => delegate(e);
export const FileInput = ({
                              input: {value: omitValue, onChange, onBlur, ...inputProps},
                              meta: omitMeta,
                              ...props
                          }) => {
    return (
        <input
            onChange={adaptFileEventToValue(onChange)}
            onBlur={adaptFileEventToValue(onBlur)}
            type="file"
            {...props.input}
            {...props}
        />
    );
};

export const renderMultiselect = ({input, ...rest}) => {
    return <Multiselect
        textField={'name'}
        {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []} // requires value to be an array
        {...rest}/>
}

export const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
    <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY hh:mm"
        time={showTime}
        step={1}
        defaultValue={new Date()}
        culture="en-GB"
        min={new Date()}
        value={!value ? null : new Date(value)}
    />

export const renderDropdownList = ({input, ...rest}) =>
    <DropdownList {...input} {...rest}/>


export const renderSelectList = ({input, ...rest}) =>
    <SelectList {...input} onBlur={() => input.onBlur()} {...rest}/>
