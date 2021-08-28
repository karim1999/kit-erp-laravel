import React, {useState, useEffect} from "react";
import {SortableElement} from "react-sortable-hoc";
import DragHandlerComponent from "./DragHandlerComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faPencilAlt, faSave, faArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import {Field, useField} from "formik";
import ReactSelectFieldComponent from "../Fields/ReactSelectFieldComponent";
import Constants from "../../../../helpers/samples";
import {
    calculateNet,
    discount,
    displayNumber, getTotalGross,
    grossValue,
    margin,
    marginPercent,
    precise
} from "../../../../helpers/helpers";
import CheckBoxFieldComponent from "../Fields/CheckBoxFieldComponent";
import TextAreaFieldComponent from "../Fields/TextAreaFieldComponent";
import SelectFieldComponent from "../Fields/SelectFieldComponent";

const SimpleTextFieldComponent= ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
}

const createPartLabel= (name, code)=>{
    if(code){
        return `${name} (${code})`;
    }else{
        return name;
    }
}

export default SortableElement(({itemIndex, remove, products}) => {
    const [productIdField, productIdFieldMeta] = useField(`items.${itemIndex}.product_id`);
    const [itemField, itemFieldMeta, itemFieldHelpers] = useField(`items.${itemIndex}`);
    const [costPriceField, costPriceFieldMeta, costPriceFieldHelpers] = useField(`items.${itemIndex}.cost_price`);
    const [accountField] = useField('account');
    const [isFetchingPrice, setIsFetchingPrice]= useState(false)
    useEffect(() => {
        console.log(itemField.value.justAdded)
        if(itemField.value.justAdded){
            console.log("onchange")
            onChange({value: itemField.value.product_id})
        }
    }, [])
    const product= () => {
        return products.find(product => product.id === productIdField.value)
    }

    const setItemData= (key, value) => {
        itemFieldHelpers.setValue({...itemField.value, [key]: value})
    }
    const isText= ()=>{
        return itemField.value.is_text
    }

    const onChange= async (option) => {
        // console.log(option)
        let product= products.find(product => product.id === option.value)
        if(!product){
            itemFieldHelpers.setValue({...Constants.samplePricingItem, product_id: option.value})
            return
        }
        let productUpdateObject= {}
        Object.keys(Constants.samplePricingItemMap).map(key => {
            if(product[Constants.samplePricingItemMap[key]])
                productUpdateObject[key]= product[Constants.samplePricingItemMap[key]]
        })
        itemFieldHelpers.setValue({...itemField.value, ...productUpdateObject})

        let Cost_Price= product.Cost_Price || 0
        // let Unit_Price= product.Unit_Price || 0

        setIsFetchingPrice(true)
        await axios.get(`/products/${product.id}/pricing/${accountField.value}`).then(res => {
            console.log(res.data.price)
            costPriceFieldHelpers.setValue(res.data.price)
        }).catch(err => {
            console.log(err)
            costPriceFieldHelpers.setValue(Cost_Price)
        }).finally(res => {
            setIsFetchingPrice(false)
        })

    }
    // const grossValue= () => {
    //     return precise(itemField.value.quantity * itemField.value.cost_price);
    // }
    // const discount= () => {
    //     return precise(grossValue()*itemField.value.discount_percent/100);
    // }
    // const net= () => {
    //     return precise(grossValue() - discount());
    // }
    return (
        <tr>
            <td className="fit">
                <CheckBoxFieldComponent name={`items.${itemIndex}.selected`} className="form-check-input" >
                    <input type="text" className="form-control" value={itemIndex+1} disabled />
                </CheckBoxFieldComponent>
            </td>
            <td className="fit">
                {
                    isText() ?
                        <SimpleTextFieldComponent type="text" className="form-control" name={`items.${itemIndex}.name`} placeholder="Name" />
                        :
                        <ReactSelectFieldComponent onChange={onChange} label="" name={`items.${itemIndex}.product_id`} options={products.map(product => ({value: product.id, label: createPartLabel(product.Product_Name, product.Product_Code)}))} />
                }
                {
                    isText() ?
                        <TextAreaFieldComponent label="" className="form-control" rows="5" name={`items.${itemIndex}.description`} placeholder="Description" />
                        :
                        <p className="table-para">
                            {itemField?.value?.description || ""}
                        </p>
                }
            </td>
            <td className="fit">
                <SimpleTextFieldComponent type="text" className="form-control" name={`items.${itemIndex}.vendor_part_number`} disabled={!isText()} />
            </td>
            <td className="fit">
                <SimpleTextFieldComponent type="text" className="form-control" name={`items.${itemIndex}.part_number`} disabled={!isText()} />
            </td>
            <td className="fit">
                {
                    isText() ?
                        <SelectFieldComponent className="custom-select" name={`items.${itemIndex}.type`}>
                            {
                                Constants.productTypes.map(status => <option key={status.key} value={status.key}>{status.value}</option>)
                            }
                        </SelectFieldComponent>
                        :
                        <SimpleTextFieldComponent type="text" className="form-control" name={`items.${itemIndex}.type`}
                                                  disabled/>
                }
            </td>
            <td className="fit">
                <SimpleTextFieldComponent type="text" className="form-control" name={`items.${itemIndex}.cost_price`} disabled={!isText()} />
            </td>
            <td className="fit">
                <SimpleTextFieldComponent type="text" className="form-control" name={`items.${itemIndex}.unit_price`} disabled={!isText()} />
            </td>
            <td className="fit">
                <SimpleTextFieldComponent min={0} type="text" className="form-control" name={`items.${itemIndex}.quantity`} />
            </td>
            <td className="fit">
                <SimpleTextFieldComponent type="text" className="form-control" name={`items.${itemIndex}.unit`} disabled={!isText()} />
            </td>
            <td className="fit">
                <input type="text" className="form-control" value={displayNumber(grossValue(itemField.value))} disabled />
            </td>
            <td className="fit">
                <SimpleTextFieldComponent min={0} type="text" step={.01} className="form-control" name={`items.${itemIndex}.discount_percent`} />
            </td>
            <td className="fit">
                <input type="text" className="form-control" value={displayNumber(discount(itemField.value))} disabled />
            </td>
            <td className="fit">
                <input min={0} type="text" className={`form-control ${marginPercent(itemField.value) < 0 && "is-invalid"}`} value={displayNumber(marginPercent(itemField.value))} disabled />
            </td>
            <td className="fit">
                <input type="text" className={`form-control ${margin(itemField.value) < 0 && "is-invalid"}`} value={displayNumber(margin(itemField.value))} disabled />
            </td>
            <td className="fit">
                <input type="text" className="form-control" value={displayNumber(calculateNet(itemField.value))} disabled />
            </td>
        </tr>
    )}
);
