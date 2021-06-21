import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import TextFieldComponent from "./Fields/TextFieldComponent";
import TableBody from "./TermsTable/TableBody";
import {useField} from "formik";
import {
    calculateNet,
    displayNumber,
    getTotalNet,
    getTotalWithVat,
    marginPercent,
    precise
} from "../../../helpers/helpers";

export default function ({deal, insert, remove, push, move, request}) {
    const [terms, termsFieldMeta, termsFieldHelpers] = useField(`paymentTerms`);
    const [itemsField] = useField(`items`);
    const [isEnabled, setIsEnabled]= useState(true);
    const [vatField] = useField(`vat`);

    const totalPercent= () => {
        if(terms.value.length <= 0)
            return 0;

        return terms.value.reduce((accumulator, currentValue) => accumulator*1 + currentValue.percent*1, 0)
    }
    const total= () => {
        if(terms.value.length <= 0)
            return 0;

        let total= getTotalWithVat(itemsField.value, vatField.value)
        return precise(totalPercent()/100 * total)
    }
    const selectAllToggle= (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        termsFieldHelpers.setValue(terms.value.map(term => ({...term, selected: value})))
    }
    const isSelectAll= () => {
        if(terms.value.length <= 0)
            return false;
        return !terms.value.some(term => !term.selected)
    }
    const insertTerm= (e) => {
        e.preventDefault();
        push(Constants.samplePricingTerm)
        return false;
    }
    const removeTerms= (e) => {
        e.preventDefault();
        let tempTerms= [...terms.value]
        termsFieldHelpers.setValue(tempTerms.filter(term => !term.selected))
    }
    const toggleEnabling= (e) => {
        e.preventDefault();
        setIsEnabled(!isEnabled)
    }
    const requestApproval= (e) => {
        e.preventDefault();
        request()
    }
    const someItemIsSelected= () => {
        return terms.value.some(term => term.selected)
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <label htmlFor="">Payment Terms</label>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <ul className="button-ul">
                        <li>
                            <a href="" onClick={insertTerm}>
                                <img src="/assets/images/plus.svg" alt="" /> Add Term
                            </a>
                        </li>
                        <li>
                            <a href="" onClick={removeTerms} disabled={!someItemIsSelected()}>
                                <img src="/assets/images/bin.svg" alt="" /> Delete Term
                            </a>
                        </li>
                        <li>
                            <a href="" onClick={requestApproval}>
                                Send for Approval
                            </a>
                        </li>
                        <li>
                            <a href="" onClick={toggleEnabling}>
                                {isEnabled ? "Disable Editing" : "Enable Editing"}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {
                terms.value.length > 0 &&
                <div className="row mt-2">
                    <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="table-info">
                                <tr>
                                    <th className="fit">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="custom-check-22" name="checkboxterms" checked={isSelectAll()} onChange={selectAllToggle} />
                                            <label className="custom-control-label" htmlFor="custom-check-22">
                                                <img src="assets/images/eye_icon.svg" alt="" /> Payment %
                                            </label>
                                        </div>
                                    </th>
                                    <th className="fit">
                                        <img src="assets/images/eye_icon.svg" alt="" /> Payment Amount
                                    </th>
                                    <th className="fit">
                                        <img src="assets/images/eye_icon.svg" alt="" /> Payment Type
                                    </th>
                                    <th className="fit">
                                        <img src="assets/images/eye_icon.svg" alt="" /> Payment Method
                                    </th>
                                    <th className="fit">
                                        <img src="assets/images/eye_closed.svg" alt="" /> Credit Days
                                    </th>
                                    <th className="fit">
                                        <img src="assets/images/eye_icon.svg" alt="" /> Payment Due Date
                                    </th>
                                </tr>
                                </thead>
                                <TableBody useDragHandle onSortEnd={({oldIndex, newIndex}) => move(oldIndex, newIndex)} isEnabled={isEnabled} remove={remove}/>
                                <thead className="table-info">
                                <tr>
                                    <th className="fit">
                                        <input type="text" value={displayNumber(totalPercent())}  className={`form-control ${totalPercent() > 100 && "is-invalid"}`} disabled />
                                    </th>
                                    <th className="fit">
                                        <label htmlFor="">Total %</label>
                                    </th>
                                    <th className="fit">
                                        <input type="text" value={displayNumber(total())} className="form-control" disabled />
                                    </th>
                                    <th className="fit" colSpan="3">
                                        <label htmlFor="">Total Net Value</label>
                                    </th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
