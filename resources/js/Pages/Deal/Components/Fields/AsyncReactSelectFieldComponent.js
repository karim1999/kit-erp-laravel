import React, { useState, useEffect } from "react";
import { useField } from 'formik';
import Constants from "../../../../helpers/samples";
import Select, { Option, ReactSelectProps } from 'react-select'
import AsyncSelect from 'react-select/async';

export default function({ form, label, options, asyncFunc, ...props }){
    const [field, meta, helpers] = useField(props);
    const promiseOptions = inputValue =>
        new Promise(resolve => {
            resolve(asyncFunc(inputValue));
        });
    return (
        <div className="form-group">
            {
                label &&
                <label htmlFor={props.id || props.name}>{label}</label>
            }
            <AsyncSelect
                {...field}
                {...props}
                loadOptions={promiseOptions}
                cacheOptions
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
                defaultOptions={options}
                // options={options}
                value={options ? options.find(option => option.value === field.value) : ''}
                onChange={(option) => {
                    helpers.setValue(option.value)
                    if(props.onChange){
                        props.onChange(option)
                    }
                }}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
}
