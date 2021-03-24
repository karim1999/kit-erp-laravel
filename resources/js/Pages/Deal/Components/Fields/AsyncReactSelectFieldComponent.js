import React, { useState, useEffect } from "react";
import { useField } from 'formik';
import Constants from "../../../../helpers/samples";
import AsyncSelect, { Option, ReactSelectProps } from 'react-select'

export default function ReactSelectFieldComponent({ form, label, options, loadOptions, ...props }){
    const [field, meta, helpers] = useField(props);
    return (
        <div className="form-group">
            {
                label &&
                <label htmlFor={props.id || props.name}>{label}</label>
            }
            <AsyncSelect
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
}
