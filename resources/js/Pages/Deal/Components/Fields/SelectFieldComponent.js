import React, { useState, useEffect } from "react";
import { useField } from 'formik';
import Constants from "../../../../helpers/samples";

export default function SelectFieldComponent({ label, ...props }){
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
}
