import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import TextFieldComponent from "./Fields/TextFieldComponent";
import DatePickerFieldComponent from "./Fields/DatePickerFieldComponent";
import TextAreaFieldComponent from "./Fields/TextAreaFieldComponent";

export default function ({deal}) {
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                    <DatePickerFieldComponent className="form-control" label="Quote Valid From" name="valid_from" />
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                    <DatePickerFieldComponent className="form-control" label="Quote Valid To" name="valid_to" />
                </div>
                {/*<div className="col-xl-2 col-lg-2 col-sm-2 col-3">*/}
                {/*    <div className="form-group">*/}
                {/*        <label> Quote Watermark </label>*/}
                {/*        <select className="custom-select">*/}
                {/*            <option selected>Select Watermark</option>*/}
                {/*            <option value="None">None</option>*/}
                {/*            <option value="Draft">Draft</option>*/}
                {/*            <option value="Confidential">Confidential</option>*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="col-xl-3 col-lg-3 col-sm-3 col-3">
                    <TextFieldComponent type="text" label="Deal Title" className="form-control" name="deal_name" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <TextAreaFieldComponent label="Deal Brief Description" className="form-control" rows="5" name="description" />
                </div>
            </div>
            <hr />
        </div>
    )
}
