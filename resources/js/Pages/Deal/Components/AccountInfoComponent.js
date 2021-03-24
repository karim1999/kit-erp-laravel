import React, { useState, useEffect } from "react";
import {useField} from "formik";
import ReactSelectFieldComponent from "./Fields/ReactSelectFieldComponent";

export default function ({deal, accounts}) {
    const [{value}, meta] = useField("account");

    const account= () => {
        return accounts.find(account => account.id === value)
    }
    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <ReactSelectFieldComponent label="Account ID No." name="account" options={accounts.map(account => ({value: account.id, label: account.Account_Auto_ID}))} />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Account Name
                            </label>
                            <input type="text" className="form-control" placeholder="" value={account()?.Account_Name || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Account TRN No.
                            </label>
                            <input type="text" className="form-control" placeholder="" value={account()?.Account_TRN_No || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Account Landline No.
                            </label>
                            <input type="text" className="form-control" placeholder="" value={account()?.Landline_No || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Account Fax No.
                            </label>
                            <input type="text" className="form-control" placeholder="" value={account()?.Account_Fax_No || ""} disabled />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}
