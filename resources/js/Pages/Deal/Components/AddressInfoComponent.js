import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import TextFieldComponent from "./Fields/TextFieldComponent";
import CheckBoxFieldComponent from "./Fields/CheckBoxFieldComponent";
import ReactSelectFieldComponent from "./Fields/ReactSelectFieldComponent";

export default function ({deal, contacts}) {
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-sm-5 col-12">
                    <CheckBoxFieldComponent name="include_billing" className="form-check-input">
                        Include Billing Address
                    </CheckBoxFieldComponent>
                    <table className="table table-bordered mt-2">
                        <tbody>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Contact Name
                            </th>
                            <td className="text-muted">
                                <ReactSelectFieldComponent label="" name="billing.contact" options={contacts.map(contact => ({value: contact.id, label: contact.Full_Name}))} />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Unit / Floor No.
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="billing.floor" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Building Name
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="billing.building" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Street Name
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="billing.street" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing District
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="billing.district" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing State / City
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="billing.state" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Country
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="billing.country" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing ZIP / P.O.Box
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="billing.postal" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-xl-5 col-lg-5 col-sm-5 col-12">
                    <CheckBoxFieldComponent name="include_shipping" className="form-check-input">
                        Include Shipping Address
                    </CheckBoxFieldComponent>
                    <table className="table table-bordered mt-2">
                        <tbody>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Contact Name
                            </th>
                            <td className="text-muted">
                                <ReactSelectFieldComponent label="" name="shipping.contact" options={contacts.map(contact => ({value: contact.id, label: contact.Full_Name}))} />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Unit / Floor No.
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="shipping.floor" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Building Name
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="shipping.building" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Street Name
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="shipping.street" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping District
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="shipping.district" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping State / City
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="shipping.state" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Country
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="shipping.country" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping ZIP / P.O.Box
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="shipping.postal" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
        </div>
    )
}
