import React, { useState, useEffect } from "react";
import { useField } from 'formik';
import Constants from "../../../../helpers/samples";
import Select, { Option, ReactSelectProps } from 'react-select'

export default function ReactSelectFieldComponent({ form, label, options, ...props }){
    const [field, meta, helpers] = useField(props);
    return (
        <div className="form-group">
            {
                label &&
                <label htmlFor={props.id || props.name}>{label}</label>
            }
            <Select
                {...field}
                {...props}
                options={options}
                value={options ? options.find(option => option.value === field.value) : ''}
                onChange={(option) => helpers.setValue(option.value)}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
}
