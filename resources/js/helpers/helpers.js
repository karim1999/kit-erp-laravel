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
    return precise(item.quantity * item.costPrice);
}
export const discount= (item) => {
    return precise(grossValue(item)*item.discountPercent/100);
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
export const getTotalByKey= (items, key) => {
    return getTotalByFunc(items, (item) => item[key])
}
export const getTotalVat= (items, vat) => {
    return getTotalNet(items) * vat/100
}
export const getTotalByFunc= (items, func) => {
    if (items.length <= 0)
        return 0;
    return precise(items.reduce((accumulator, currentValue) => accumulator*1 + func(currentValue), 0))
}
