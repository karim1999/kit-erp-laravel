import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import TextFieldComponent from "./Fields/TextFieldComponent";
import {useField} from "formik";
import ReactSelectFieldComponent from "./Fields/ReactSelectFieldComponent";

export default function ({deal, users, accounts}) {
    const [{value}, meta] = useField("sales_person");
    const [accountData, accountMeta] = useField("account");

    const salesPerson= () => {
        return users.find(user => user.id === value)
    }
    const account= () => {
        return accounts.find(account => account.id === accountData.value)
    }
    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <ReactSelectFieldComponent isDisabled label="Salesperson Name" name="sales_person" options={users.map(user => ({value: user.id, label: user.full_name}))} />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-9">
                        <div className="form-group">
                            <label>Office Name</label>
                            <input type="text" className="form-control" placeholder="" value={salesPerson()?.Office_Name || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>Department Name</label>
                            <input type="text" className="form-control" value={salesPerson()?.Department_Name || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>Credit Controller</label>
                            <input type="text" className="form-control" value={account()?.Credit_Controller?.name || ""} disabled />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-4">
            <div className="row">
                <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                    <div className="form-group">
                        <label>
                            <img src="assets/images/eye_icon.svg" alt="" />
                            Salesperson Email
                        </label>
                        <input type="text" className="form-control" value={salesPerson()?.email || ""} disabled />
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                    <div className="form-group">
                        <label>
                            <img src="assets/images/eye_icon.svg" alt="" />
                            Salesperson Mobile No.
                        </label>
                        <input type="text" className="form-control" value={salesPerson()?.Primary_Mobile_No1 || ""} disabled />
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                    <div className="form-group">
                        <label>
                            <img src="assets/images/eye_icon.svg" alt="" />
                            Salesperson Landline No.
                        </label>
                        <input type="text" className="form-control" value={salesPerson()?.Landline_No1 || ""} disabled />
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                    <div className="form-group">
                        <label>
                            <img src="assets/images/eye_icon.svg" alt="" />
                            Salesperson Extension No.
                        </label>
                        <input type="text" className="form-control" value={salesPerson()?.Extension_No || ""} disabled />
                    </div>
                </div>
            </div>
            <hr />
        </div>
        </>
    )
}
