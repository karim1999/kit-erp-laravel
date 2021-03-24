import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import TextFieldComponent from "./Fields/TextFieldComponent";
import TableBody from "./Table/TableBody";

export default function ({deal, insert, remove, push, move, products}) {
    const insertItem= (e) => {
        e.preventDefault();
        insert(Constants.samplePricingItem)
        return false;
    }
    const importItems= (e) => {
        e.preventDefault();
        return false;
    }
    const moveItemsUp= (e) => {
        e.preventDefault();
        return false;
    }
    const moveItemsDown= (e) => {
        e.preventDefault();
        return false;
    }
    const removeItems= (e) => {
        e.preventDefault();
        return false;
    }
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <label>Quote Table</label>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <ul className="button-ul">
                        <li>
                            <a href="">
                                <img src="assets/images/import.svg" alt="" /> Import Items
                            </a>
                        </li>
                        <li>
                            <a href="" onClick={insertItem}>
                                <img src="assets/images/plus.svg" alt="" /> Add Item
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="assets/images/move_up.svg" alt="" /> Move Item Up
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="assets/images/move_down.svg" alt="" /> Move Item Down
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="assets/images/bin.svg" alt="" /> Delete Item
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <div className="table-responsive scrollBox">
                        <table className="table table-bordered">
                            <thead className="table-info">
                            <tr>
                                <th className="fit">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="custom-check-21" />
                                        <label className="custom-control-label" htmlFor="custom-check-21">
                                            <img src="assets/images/eye_icon.svg" alt="" /> Line #
                                        </label>
                                    </div>
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Product Name / Description
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Vendor Part No.
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Part No.
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Product Type
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_closed.svg" alt="" /> Cost Price
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Unit Price
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Quantity
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Unit
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Gross Value
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Discount %
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_icon.svg" alt="" /> Discount Value
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_closed.svg" alt="" /> Margin %
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_closed.svg" alt="" /> Margin Value
                                </th>
                                <th className="fit">
                                    <img src="assets/images/eye_closed.svg" alt="" /> Net Value
                                </th>
                            </tr>
                            </thead>
                            <TableBody useDragHandle products={products} onSortEnd={({oldIndex, newIndex}) => move(oldIndex, newIndex)} remove={remove}/>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
