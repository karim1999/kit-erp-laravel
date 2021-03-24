import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import TextFieldComponent from "./Fields/TextFieldComponent";
import CheckBoxFieldComponent from "./Fields/CheckBoxFieldComponent";
import {useField} from "formik";
import {getTotalByKey, getTotalDiscount, getTotalGross, getTotalNet, getTotalVat} from "../../../helpers/helpers";

export default function ({deal}) {
    const [type, setType]= useState("");
    const [itemsField] = useField(`items`);
    const [vatField] = useField(`vat`);

    const currentItems= () => {
        if(type === "")
            return itemsField.value
        return itemsField.value.filter(item => item.type === type)
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-sm-5 col-12">
                    <label htmlFor="">Commercial Overview</label>
                    <table className="table table-bordered mt-2">
                        <tbody>
                        <tr>
                            <th className="table-info pt-3">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Product Type
                            </th>
                            <td className="text-muted">
                                <select className="custom-select" value={type} onChange={event => setType(event.target.value)}>
                                    <option>Product Type</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="AMC - Hardware">AMC - Hardware</option>
                                    <option value="AMC - Software">AMC - Software</option>
                                    <option value="Application">Application</option>
                                    <option value="Cloud">Cloud</option>
                                    <option value="Consultancy">Consultancy</option>
                                    <option value="Deployment and Field Service">Deployment and Field Service</option>
                                    <option value="Development">Development</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Managed Services">Managed Services</option>
                                    <option value="Professionals Services">Professionals Services</option>
                                    <option value="Software">Software</option>
                                    <option value="Spare Parts">Spare Parts</option>
                                    <option value="Warranty">Warranty</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                Total Cost Price
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalByKey(currentItems(), "costPrice")} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                Total Gross Value
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalGross(currentItems())} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                Total Discount Value
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalDiscount(currentItems())} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                Total Discount %
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalByKey(currentItems(), "discountPercent")} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                Total Margin Value
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalByKey(currentItems(), "margin")} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                Total Margin %
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalByKey(currentItems(), "marginPercent")} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                Total Net Value
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalNet(currentItems())} disabled />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-xl-5 col-lg-5 col-sm-5 col-12">
                    <label htmlFor="">Commercial Summary</label>
                    <table className="table table-bordered mt-2">
                        <tbody>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Total Gross Value
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalGross(itemsField.value)} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Total Discount Value
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalDiscount(itemsField.value)} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Total Discount %
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalByKey(itemsField.value, "discountPercent")} disabled />
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <th className="table-info">*/}
                        {/*        <div className="custom-control custom-checkbox">*/}
                        {/*            <input type="checkbox" className="custom-control-input" id="custom-check-10" disabled />*/}
                        {/*            <label className="custom-control-label" htmlFor="custom-check-10">Freight and Customs %</label>*/}
                        {/*        </div>*/}
                        {/*    </th>*/}
                        {/*    <td className="text-muted">*/}
                        {/*        <input type="text" className="form-control" placeholder="100.00" disabled />*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <th className="table-info">*/}
                        {/*        <img src="assets/images/eye_closed.svg" alt="" className="mr-2" /> Freight and Customs*/}
                        {/*        Value*/}
                        {/*    </th>*/}
                        {/*    <td className="text-muted">*/}
                        {/*        <input type="text" className="form-control" placeholder="99,999,999.99" disabled />*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Total Net Value
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalNet(itemsField.value)} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> VAT %
                            </th>
                            <td className="text-muted">
                                <TextFieldComponent type="text" label="" className="form-control" name="vat" />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> VAT Value
                            </th>
                            <td className="text-muted">
                                <input type="number" step={.1} className="form-control" value={getTotalVat(itemsField.value, vatField.value)} disabled />
                            </td>
                        </tr>
                        <tr>
                            <th className="table-info">
                                <img src="assets/images/eye_icon.svg" alt="" className="mr-2" /> Total Net Value Inc. VAT
                            </th>
                            <td className="text-muted">
                                <input type="text" className="form-control" value={getTotalNet(itemsField.value) + (getTotalVat(itemsField.value, vatField.value))} disabled />
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
