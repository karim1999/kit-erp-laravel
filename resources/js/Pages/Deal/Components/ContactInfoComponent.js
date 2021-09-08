import React, { useState, useEffect } from "react";
import {useField} from "formik";
import ReactSelectFieldComponent from "./Fields/ReactSelectFieldComponent";

export default function ({deal, contacts}) {
    const [{value}, meta] = useField("contact");

    const contact= () => {
        // return contacts.find(contact => contact.id === value)
    }
    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        {/*<ReactSelectFieldComponent isDisabled label="Contact ID No." name="contact" options={contacts.map(contact => ({value: contact.id, label: contact.Contact_Auto_No}))} />*/}
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Contact ID No.
                            </label>
                            <input type="text" className="form-control" placeholder="" value={deal?.Contact_ID_No || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Contact Name
                            </label>
                            <input type="text" className="form-control" placeholder="" value={deal?.Contact_Name?.name || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Contact Email
                            </label>
                            <input type="text" className="form-control" placeholder="" value={deal?.Account_Generic_Email || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Contact Mobile No.
                            </label>
                            <input type="text" className="form-control" placeholder="" value={deal?.Contact_Mobile_No || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Contact Landline No.
                            </label>
                            <input type="text" className="form-control" placeholder="" value={deal?.Contact_Landline_No || ""} disabled />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-3">
                        <div className="form-group">
                            <label>
                                <img src="assets/images/eye_icon.svg" alt="" />
                                Contact Extension No.
                            </label>
                            <input type="text" className="form-control" placeholder="" value={deal?.Contact_Extension_No || ""} disabled />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
