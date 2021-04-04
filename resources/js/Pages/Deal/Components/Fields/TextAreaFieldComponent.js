import React, { useState, useEffect } from "react";
import { useField } from 'formik';
import Constants from "../../../../helpers/samples";

export default function TextAreaFieldComponent({ label, ...props }){
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            {
                label &&
                <label>{label}</label>
            }
            <textarea {...field} {...props} rows="5" />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
}
