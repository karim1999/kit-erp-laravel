export const calculateItemDiscount= (item) => {
    if(item.discountType == "%"){
        return precise((item.outRate*item.quantity) * (item.discount/100))
    }else{
        return precise(item.discount*1)
    }
};
export const calculateItemMargin= (item) => {
    if(item.marginType == "%"){
        return precise((item.inRate*item.quantity) * (item.margin/100))
    }else{
        return precise(item.margin*1)
    }

};

export const precise = (x) => {
    // if (typeof x === 'string' || x instanceof String){
    //     return Number.parseFloat(x).toFixed(2);
    // }else{
    return Math.round((x + Number.EPSILON) * 100) / 100
    // }

};
export const grossValue= (item) => {
    return precise(item.quantity * item.unit_price);
}
export const discount= (item) => {
    return precise(grossValue(item)*item.discount_percent/100);
}
export const margin= (item) => {
    return precise(calculateNet(item) - (item.quantity * item.cost_price));
}
export const marginPercent= (item) => {
    if(!calculateNet(item))
        return 0;
    return precise(margin(item)/ (item.quantity * item.cost_price) *100);
}
export const calculateNet= (item) => {
    return precise(grossValue(item) - discount(item));
}

export const getTotalNet= (items) => {
    return getTotalByFunc(items, calculateNet)
}
export const getTotalGross= (items) => {
    return getTotalByFunc(items, grossValue)
}
export const getTotalDiscount= (items) => {
    return getTotalByFunc(items, discount)
}
export const getTotalMargin= (items) => {
    return getTotalByFunc(items, margin)
}
export const getTotalByKey= (items, key) => {
    return getTotalByFunc(items, (item) => (item[key] || 0)*1)
}
export const getTotalPercentByKey= (items, key) => {
    if(!getTotalNet(items))
        return 0;
    return precise(getTotalByKey(items, key) / getTotalGross(items) * 100)
}
export const getTotalDiscountPercent= (items) => {
    if(!getTotalNet(items))
        return 0;
    return precise(getTotalDiscount(items) / getTotalGross(items) * 100)
}
export const getTotalMarginPercent= (items) => {
    if(!getTotalNet(items))
        return 0;
    return precise(getTotalMargin(items) / getTotalGross(items) * 100)
}

export const getTotalVat= (items, vat) => {
    return precise(getTotalNet(items) * vat/100)
}
export const getTotalWithVat= (items, vat) => {
    return precise(getTotalNet(items) + (getTotalVat(items, vat)))
}
export const getTotalByFunc= (items, func) => {
    if (items.length <= 0)
        return 0;
    return precise(items.reduce((accumulator, currentValue) => accumulator*1 + func(currentValue), 0))
}

export const mapItems= (items, products) => {
    return items.map(item => {
        let product= products.find(product => product.id === item.product_id)

        return {
            ...item,
            gross: grossValue(item),
            discount: discount(item),
            margin: margin(item),
            net: calculateNet(item),
            group: product?.Product_Quote_Group || "",
        }
    })
}
export const mapTerms= (terms, items) => {
    let total= getTotalNet(items)
    return terms.map(term => ({...term, value: precise(term.percent/100 * total)}))
}

export const isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
