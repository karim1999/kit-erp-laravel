import React, { useState, useEffect } from "react";
import { useField } from 'formik';
import Constants from "../../../../helpers/samples";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerFieldComponent({ form, label, options, ...props }){
    const [field, meta, helpers] = useField(props);
    return (
        <div className="form-group">
            <label>{label}</label>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(dateValue) => helpers.setValue(dateValue)}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};
