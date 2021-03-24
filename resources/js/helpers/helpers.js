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
