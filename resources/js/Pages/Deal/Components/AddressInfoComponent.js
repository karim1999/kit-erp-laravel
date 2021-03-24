import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import TextFieldComponent from "./Fields/TextFieldComponent";
import CheckBoxFieldComponent from "./Fields/CheckBoxFieldComponent";

export default function ({deal}) {
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-sm-5 col-12">
                    <CheckBoxFieldComponent name="includeBilling" className="form-check-input">
                        Include Billing Address
                    </CheckBoxFieldComponent>
                    <table className="table table-bordered mt-2">
                        <tbody>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Contact Name
                            </th>
                            <td className="text-muted">Mahmoud Kamal</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Unit / Floor No.
                            </th>
                            <td className="text-muted">Unit 301, 3rd Floor</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Building Name
                            </th>
                            <td className="text-muted">Al Yateem Building</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Street Name
                            </th>
                            <td className="text-muted">Kuwait Street</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing District
                            </th>
                            <td className="text-muted">Al Raffa</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing State / City
                            </th>
                            <td className="text-muted">Dubai</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing Country
                            </th>
                            <td className="text-muted">Unitied Arab Emirates</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Billing ZIP / P.O.Box
                            </th>
                            <td className="text-muted">6856</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-xl-5 col-lg-5 col-sm-5 col-12">
                    <CheckBoxFieldComponent name="includeShipping" className="form-check-input">
                        Include Shipping Address
                    </CheckBoxFieldComponent>
                    <table className="table table-bordered mt-2">
                        <tbody>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Contact Name
                            </th>
                            <td className="text-muted">Moumen Mohammed</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Unit / Floor No.
                            </th>
                            <td className="text-muted">Unit 103, 1st Floor</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Building Name
                            </th>
                            <td className="text-muted">Al Gurg Building</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Street Name
                            </th>
                            <td className="text-muted">Al Raffa Street</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping District
                            </th>
                            <td className="text-muted">Al Mankhool</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping State / City
                            </th>
                            <td className="text-muted">Dubai</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping Country
                            </th>
                            <td className="text-muted">Unitied Arab Emirates</td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Shipping ZIP / P.O.Box
                            </th>
                            <td className="text-muted">7840</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
        </div>
)
}
