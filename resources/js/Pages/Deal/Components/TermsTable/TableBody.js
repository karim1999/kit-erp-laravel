import {SortableContainer} from "react-sortable-hoc";
import React from "react";
import TableItem from "./TableItem";
import {useField} from "formik";

export default SortableContainer(({items, insert, remove, push, isEnabled}) => {
    const [{value}, meta] = useField("paymentTerms");
    return (
        <tbody>
        {value.map((item, index) => (
            <TableItem key={`item-${index}`} index={index} itemIndex={index} item={item} insert={insert} isEnabled={isEnabled} remove={remove} push={push} />
        ))}
        </tbody>
    );
});

