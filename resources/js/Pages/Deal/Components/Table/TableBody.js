import {SortableContainer} from "react-sortable-hoc";
import React from "react";
import TableItem from "./TableItem";
import {useField} from "formik";

export default SortableContainer(({items, insert, remove, push, products}) => {
    const [{value}, meta] = useField("items");
    return (
        <tbody>
        {value.map((item, index) => (
            <TableItem products={products} key={`item-${index}`} index={index} itemIndex={index} item={item} insert={insert} remove={remove} push={push} />
        ))}
        </tbody>
    );
});

