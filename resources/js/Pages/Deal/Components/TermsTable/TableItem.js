import React, {useState} from "react";
import {SortableElement} from "react-sortable-hoc";
import DragHandlerComponent from "./DragHandlerComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faPencilAlt, faSave, faArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import {Field, useField} from "formik";
import ReactSelectFieldComponent from "../Fields/ReactSelectFieldComponent";
import Constants from "../../../../helpers/samples";
import {
    calculateNet,
    displayNumber,
    getTotalNet,
    getTotalVat,
    getTotalWithVat,
    precise
} from "../../../../helpers/helpers";
import CheckBoxFieldComponent from "../Fields/CheckBoxFieldComponent";
import DatePicker from "react-datepicker";
import SelectFieldComponent from "../Fields/SelectFieldComponent";
import DatePickerFieldComponent from "../Fields/DatePickerFieldComponent";

const SimpleTextFieldComponent= ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
}
const SimpleSelectFieldComponent= ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
}
const SimpleDatePickerFieldComponent= ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
        <>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(dateValue) => helpers.setValue(dateValue)}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
}

export default SortableElement(({itemIndex, remove, products, isEnabled}) => {
    const [percentField, percentFieldMeta] = useField(`paymentTerms.${itemIndex}.percent`);
    const [itemsField] = useField(`items`);
    const [vatField] = useField(`vat`);

    const termValue= () => {
        if(itemsField.value.length <= 0)
            return 0;

        let total= getTotalWithVat(itemsField.value, vatField.value)
        // let total= getTotalNet(itemsField.value)

        return precise(percentField.value/100 * total);
    }
    return (
        <tr>
            <td className="fit">
                <CheckBoxFieldComponent name={`paymentTerms.${itemIndex}.selected`} className="form-check-input" disabled={!isEnabled} >
                    <SimpleTextFieldComponent type="text" className="form-control" name={`paymentTerms.${itemIndex}.percent`} disabled={!isEnabled} />
                </CheckBoxFieldComponent>
            </td>
            <td className="fit">
                <input type="text" className="form-control" value={displayNumber(termValue())} disabled />
            </td>
            <td className="fit">
                <SimpleSelectFieldComponent className="custom-select" name={`paymentTerms.${itemIndex}.type`} disabled={!isEnabled}>
                    {
                        Constants.paymentTermsTypes.map(status => <option key={status.value} value={status.value}>{status.value}</option>)
                    }
                </SimpleSelectFieldComponent>
            </td>
            <td className="fit">
                <SimpleSelectFieldComponent className="custom-select" name={`paymentTerms.${itemIndex}.method`} disabled={!isEnabled}>
                    {
                        Constants.paymentTermsMethods.map(status => <option key={status.value} value={status.value}>{status.value}</option>)
                    }
                </SimpleSelectFieldComponent>
            </td>
            <td className="fit">
                <SimpleTextFieldComponent type="text" className="form-control" name={`paymentTerms.${itemIndex}.days`} disabled={!isEnabled} />
            </td>
            <td className="fit">
                <SimpleDatePickerFieldComponent className="form-control" name={`paymentTerms.${itemIndex}.end_date`} popperPlacement="top-end" disabled={!isEnabled}/>
            </td>
        </tr>
    )}
);
