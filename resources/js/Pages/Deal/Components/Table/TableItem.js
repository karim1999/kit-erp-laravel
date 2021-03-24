import React from "react";
import {SortableElement} from "react-sortable-hoc";
import DragHandlerComponent from "./DragHandlerComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faPencilAlt, faSave, faArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import {Field, useField} from "formik";
import ReactSelectFieldComponent from "../Fields/ReactSelectFieldComponent";


export default SortableElement(({item, itemIndex, remove, products}) => {
    const [{value}, meta] = useField(`items.${itemIndex}.productId`);

    const product= () => {
        return products.find(product => product.id === value)
    }

    console.log(product());

    return (
        <tr>
            <td className="fit">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="custom-check-22" />
                    <label className="custom-control-label" htmlFor="custom-check-22">
                        <input type="text" className="form-control" value={itemIndex} disabled />
                    </label>
                </div>
            </td>
            <td className="fit">
                <ReactSelectFieldComponent label="" name={`items.${itemIndex}.productId`} options={products.map(product => ({value: product.id, label: product.Product_Name}))} />
                {/*<h6>Product Name</h6>*/}
                <p className="table-para">
                    {product()?.Product_Description || ""}
                </p>
            </td>
            <td className="fit">
                <input type="text" className="form-control" value={product()?.SKU_No || ""} disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" value={product()?.Product_Code || ""} disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" value={product()?.Product_Type || ""} disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="99,999,999.99" disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="99,999,999.99" disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="1,000.00" />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="PCX" disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="99,999,999.99" disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="100.00" />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="99,999,999.99" disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="100.00" disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="99,999,999.99" disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" placeholder="99,999,999.99" disabled />
            </td>
        </tr>
    )}
);
