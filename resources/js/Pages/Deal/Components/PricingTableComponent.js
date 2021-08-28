import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import TextFieldComponent from "./Fields/TextFieldComponent";
import TableBody from "./Table/TableBody";
import {useField} from "formik";
import {isNumeric, precise} from "../../../helpers/helpers";
import MultiSelectModal from "./Table/MultiSelectModal";

export default function ({deal, insert, remove, push, move, products}) {
    const [items, itemsFieldMeta, itemsFieldHelpers] = useField(`items`);
    const selectAllToggle= (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        itemsFieldHelpers.setValue(items.value.map(item => ({...item, selected: value})))
    }
    const isSelectAll= () => {
        if(items.value.length <= 0)
            return false;
        return !items.value.some(item => !item.selected)
    }
    const insertItem= (e) => {
        e.preventDefault();
        push(Constants.samplePricingItem)
        return false;
    }
    const insertTextItem= (e) => {
        e.preventDefault();
        push({...Constants.samplePricingItem, is_text: true})
        return false;
    }
    const importItems= (e) => {
        e.preventDefault();
    }
    const moveItemsUp= (e) => {
        e.preventDefault();
        items.value.forEach((item, index) => {
            if(index !== 0 && item.selected){
                move(index, index-1)
            }
        })
    }
    const moveItemsDown= (e) => {
        e.preventDefault();
        items.value.forEach((item, index) => {
            if(index < items.value.length - 1 && item.selected){
                move(index, index+1)
            }
        })
    }
    const removeItems= (e) => {
        e.preventDefault();
        let tempItems= [...items.value]
        itemsFieldHelpers.setValue(tempItems.filter(item => !item.selected))
        // items.value.slice().reverse().forEach((item, index) => {
        //     if(item.selected)
        //         remove(index)
        // })
    }
    const importFile= (event) => {
        var reader = new FileReader();
        var f = event.target.files[0];
        reader.onload = (e) => {
            parseResult(e.target.result); //this is where the csv array will be
        };
        reader.readAsText(f);
    };
    const parseResult =async (result) => {
        const splitArr= result.split("\n");
        for (const row of splitArr) {

            let importElArr = row.split(",");
            if(row !== ""){
                let importEl = {...Constants.samplePricingItem, is_text: true};
                importElArr.map((value,index) => {
                    if(Constants.pricingItemImportOrder.length > index){
                        console.log(Constants.pricingItemImportOrder[index], value)
                        importEl[Constants.pricingItemImportOrder[index]]= isNumeric(value) ? parseFloat(value): value
                    }
                })
                push(importEl);
            }
        }
    };
    const startImporting= (e) => {
        e.preventDefault();
        document.getElementById("file").click()
    }
    const someItemIsSelected= () => {
        return items.value.some(item => item.selected)
    }
    return (
        <div className="container my-4">
            <MultiSelectModal push={push} products={products} />
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <label>Quote Table <span className="error">*</span></label>
                </div>
            </div>
            <input onChange={importFile} style={{display: "none"}} type="file" id="file" name="file" />
            <div className="row mt-2">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <ul className="button-ul">
                        {/*<li>*/}
                        {/*    <a href="" onClick={startImporting}>*/}
                        {/*        <img src="/assets/images/import.svg" alt="" /> Import Items*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        <li>
                            <a href="#" data-toggle="modal" data-target="#multiModal">
                                <img src="/assets/images/plus.svg" alt="" /> Add Multi Items
                            </a>
                        </li>
                        <li>
                            <a href="" onClick={insertItem}>
                                <img src="/assets/images/plus.svg" alt="" /> Add Item
                            </a>
                        </li>
                        {/*<li>*/}
                        {/*    <a href="" onClick={insertTextItem}>*/}
                        {/*        <img src="/assets/images/plus.svg" alt="" /> Add New Item*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        <li>
                            <a href="" onClick={moveItemsUp} disabled={!someItemIsSelected()}>
                                <img src="/assets/images/move_up.svg" alt="" /> Move Item Up
                            </a>
                        </li>
                        <li>
                            <a href="" onClick={moveItemsDown} disabled={!someItemIsSelected()}>
                                <img src="/assets/images/move_down.svg" alt=""/> Move Item Down
                            </a>
                        </li>
                        <li>
                            <a href="" onClick={removeItems} disabled={!someItemIsSelected()}>
                                <img src="/assets/images/bin.svg" alt="" /> Delete Item
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {
                items.value.length > 0 &&
                <div className="row mt-2">
                    <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                        <div className="table-responsive scrollBox">
                            <table className="table table-bordered">
                                <thead className="table-info">
                                <tr>
                                    <th className="fit">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="custom-check-21" checked={isSelectAll()} onChange={selectAllToggle} />
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
            }
        </div>
    )
}
