import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, useField, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Constants from "../../helpers/samples";
import {
    precise,
    calculateItemDiscount,
    calculateItemMargin,
    mapTerms,
    mapItems,
    getTotalByKey,
    getTotalDiscountPercent,
    getTotalDiscount,
    getTotalGross,
    getTotalMarginPercent,
    getTotalMargin,
    getTotalWithVat, getTotalVat, margin, getTotalFright
} from "../../helpers/helpers";
import HeaderComponent from "./Components/HeaderComponent";
import QuoteBasicInfoComponent from "./Components/QuoteBasicInfoComponent";
import SalesPersonInfoComponent from "./Components/SalesPersonInfoComponent";
import ContactInfoComponent from "./Components/ContactInfoComponent";
import AccountInfoComponent from "./Components/AccountInfoComponent";
import AddressInfoComponent from "./Components/AddressInfoComponent";
import PricingTableComponent from "./Components/PricingTableComponent";
import QuoteOtherInfoComponent from "./Components/QuoteOtherInfoComponent";
import OverviewComponent from "./Components/OverviewComponent";
import PaymentTermsComponent from "./Components/PaymentTermsComponent";
import NotesComponent from "./Components/NotesComponent";
import {toast, ToastContainer} from "react-toastify";
import moment from "moment";

const getInitData= (quoteData, value) => {
    return quoteData || value
}
const getInitArrayData= (quoteData, value, template) => {
    if(!quoteData)
        return value;

    let tempItems= quoteData.map(item => ({...template, ...item}))
    console.log({tempItems})
    return tempItems;
}
const termsSchema= Yup.array().test(
    'is-more-than-100',
    'Total percentage should equal to 100',
    (value, context) => {
        if(value.length <= 0)
            return true;

        let total= value.reduce((accumulator, currentValue) => accumulator*1 + currentValue.percent*1, 0);
        if(total !== 100)
            return false

        return true
    },
).of(Yup.object().shape({
    percent: Yup.number().typeError('Must be a Number').required('Required').positive('Must be Positive'),
    value: Yup.number().nullable().typeError('Must be a Number'),
    // type: Yup.string().typeError('Must be a String')
    //     .required('Required')
    //     .oneOf(Constants.paymentTermsTypes.map(type => type.value)),
    // method: Yup.string().typeError('Must be a String')
    //     .required('Required')
    //     .oneOf(Constants.paymentTermsMethods.map(type => type.value)),
    days: Yup.number().typeError('Must be a Number').nullable().integer('Must be Positive').min(0, 'Must be greater than 0'),
    end_date: Yup.date().typeError('Must be a valid Date').nullable(),
}))
const getShippingDetailsFromDeal= (deal) => {
    return {
        ...Constants.sampleShipping,
        contact: deal.Shipping_Contact_Name?.id,
        country: deal.Shipping_Country,
        district: deal.Shipping_District,
        state: deal.Shipping_State_City,
        postal: deal.Shipping_ZIP_P_O_Box,
        street: deal.Shipping_Street,
        floor: deal.Shipping_Unit_Floor_No,
        building: deal.Shipping_Building_Name,
    }
}
const getBillingDetailsFromDeal= (deal) => {
    return {
        ...Constants.sampleShipping,
        contact: deal.Billing_Contact_Name?.id,
        country: deal.Billing_Country,
        district: deal.Billing_District,
        state: deal.Billing_State_City,
        postal: deal.Billing_ZIP_P_O_Box,
        street: deal.Billing_Street,
        floor: deal.Billing_Unit_Floor_No,
        building: deal.Billing_Building_Name,
    }
}

const dateOrNull= (date, returnDate= true, format= "MM/DD/YYYY") => {
    if(date){
        try {
            return moment(date).format(format)
        }catch (e){
            return returnDate ? moment().format(format) : null
        }
    }
    return returnDate ? moment().format(format) : null
}

export default function Show({ quote, current_deal_id, current_deal= Constants.sampleOpportunity, quotes= [], contactsObj= {}, usersObj= {}, accountsObj= {}, productsObj= {} }) {
    const [deal, setDeal]= useState({...current_deal.data[0]});
    const [users, setUsers]= useState([usersObj.data[0]]);
    const [contacts, setContacts]= useState(contactsObj.data);
    const [accounts, setAccounts]= useState(accountsObj.data);
    const [products, setProducts]= useState(productsObj.data);
    const formRef = useRef();
    const { flash  } = usePage().props

    console.log({deal});
    console.log({contacts});
    console.log({accounts});
    console.log({users});

    useEffect(() => {
        if (flash){
            console.log({flash})
            toast(flash.msg, {autoClose: 5000, type: flash.type});
        }
    }, [flash])
    const dealTerms= () => {
        if(!deal?.Payment_Terms_Details)
            return []

        return deal.Payment_Terms_Details.map(term => {
            let termData= {};
            Object.keys(Constants.pricingTermMap).map(key => {
                termData[key]= term[Constants.pricingTermMap[key]]
            })
            return termData;
        })
    }

    const initialValues= {
        quote_id: getInitData(quote?.id, ""),
        quote_no: getInitData(quote?.quote_no, ""),
        subject: getInitData(quote?.quote_no, ""),
        quote_stage: getInitData(quote?.Stage, ""),
        status:  getInitData(quote?.status, Constants.statusTypes[0].value),
        approval_status: getInitData(quote?.approval_status, Constants.approvalStatusTypes[0].value),
        sales_person: getInitData(quote?.sales_person, users.find(user => user.id === deal.Owner.id)?.id),
        contact: getInitData(quote?.contact, contacts.find(contact => contact.id === deal.Contact_Name?.id)?.id),
        account: getInitData(quote?.account, accounts.find(account => account.id === deal.Account_Name?.id)?.id),
        include_shipping: getInitData(quote?.include_shipping, false),
        include_billing: getInitData(quote?.include_billing, true),
        shipping: getInitData(quote?.shipping, getShippingDetailsFromDeal(deal)),
        billing: getInitData(quote?.billing, getBillingDetailsFromDeal(deal)),
        deal_name: getInitData(quote?.deal_name, deal.Deal_Name),
        valid_from: getInitData(dateOrNull(quote?.valid_from, false), getInitData(dateOrNull(deal.Deal_Registration_Expiry))),
        valid_to: getInitData(dateOrNull(quote?.valid_to, false), getInitData(dateOrNull(deal.Deal_Reg_Valid_To))),
        description: getInitData(quote?.description, deal.Description),
        items: getInitArrayData(quote?.items, [], Constants.samplePricingItem),
        notes: getInitData(quote?.notes, ""),
        paymentTerms: getInitArrayData(quote?.terms?.map(term => {
            return {
                ...term,
                end_date: term.end_date ? moment(term?.end_date).format("MM/DD/YYYY") : ""
            };
        }), dealTerms(), Constants.samplePricingTerm),
        vat: getInitData(quote?.vat, 5),
        customs: getInitData(quote?.customs, 0),
    }

    useEffect(() => {
        if (quote){
            formRef.current.setValues(initialValues)
        }
    }, [quote])

    const validationSchema= Yup.object({
        status: Yup.string().typeError('Must be a String')
            .required('Required')
            .oneOf(Constants.statusTypes.map(status => status.value)),
        approval_status: Yup.string().typeError('Must be a String')
            .required('Required')
            .oneOf(Constants.approvalStatusTypes.map(status => status.value)),
        vat: Yup.number().typeError('Must be a Number').min(0, 'Must be greater than 0'),
        customs: Yup.number().typeError('Must be a Number').min(0, 'Must be greater than 0'),
        items: Yup.array().min(1).test(
            'is-less-than-100',
            'The margin should be more than 0',
            (value, context) => {
                if(value.length <= 0)
                    return true;

                let check= value.some(item => {
                    return margin(item) < 0;
                });
                if(check)
                    return false

                return true
            },
        ).of(Yup.object().shape({
            is_text: Yup.boolean(),
            product_id: Yup.string().typeError('Must be a String').nullable()
                .when("is_text", {
                    is: 0 || false,
                    then: Yup.string().typeError('Must be a String').required('Required')
                }),
            description: Yup.string().typeError('Must be a String').nullable()
                .when("is_text", {
                    is: 1 || true,
                    then: Yup.string().typeError('Must be a String').required('Required')
                }),
            name: Yup.string().typeError('Must be a String').nullable()
                .when("is_text", {
                    is: true,
                    then: Yup.string().typeError('Must be a String').required('Required')
                }),

            quantity: Yup.number().typeError('Must be a Number').required('Required').min(0, 'Must be greater than 0').integer('Must be Positive'),

            cost_price: Yup.number().typeError('Must be a Number').min(0, 'Must be greater than 0'),
            unit_price: Yup.number().typeError('Must be a Number').min(0, 'Must be greater than 0'),

            margin: Yup.number().nullable().typeError('Must be a Number').min(0, 'Must be greater than 0'),
            margin_percent: Yup.number().typeError('Must be a Number').min(0, 'Must be greater than 0'),

            discount: Yup.number().nullable().typeError('Must be a Number').min(0, 'Must be greater than 0'),
            discount_percent:  Yup.number().typeError('Must be a Number').min(0, 'Must be greater than 0'),

            gross:  Yup.number().nullable().typeError('Must be a Number').min(0, 'Must be greater than 0'),
            net:  Yup.number().nullable().typeError('Must be a Number').min(0, 'Must be greater than 0'),
        })),
        paymentTerms: termsSchema,
    })

    const onSubmit= (values, { setSubmitting }) => {
        console.log(values)
        // Inertia.put('/users', {
        //     data: {
        //         values,
        //         id: current_deal_id
        //     },
        // })
        alert(JSON.stringify(values, null, 2));
    }
    const prepareDataBeforeSend= async (data) => {
        console.log(data)
        let validationResult= await validate()
        if(Object.keys(validationResult).length > 0){
            console.log({validationResult})
            console.log(Object.values(validationResult).flat(2))
            if(!Array.isArray(Object.values(validationResult).flat(2)[0])){
                toast.error(Object.values(validationResult).flat(2)[0], {autoClose: 5000});
            }else if(validationResult.items && Array.isArray(validationResult.items)){
                toast.error("Please check the inserted items", {autoClose: 5000});
            }else if(validationResult.paymentTerms && Array.isArray(validationResult.paymentTerms)){
                toast.error("Please check the inserted payment terms", {autoClose: 5000});
            }else{
                toast.error("Please check your input", {autoClose: 5000});
            }
            return false;
        }
        let paymentTermsTemp= mapTerms([...data.paymentTerms], data.items)
        let itemsTemp= mapItems([...data.items], products)
        return {
            ...data,
            terms: paymentTermsTemp,
            items: itemsTemp,
            zoho_id: current_deal_id,
            "Total_Cost_Price": getTotalByKey(data.items, "cost_price"),
            "Total_Discount": getTotalDiscountPercent(data.items),
            "Total_Discount_Value": getTotalDiscount(data.items),
            "Total_Gross_Value": getTotalGross(data.items),
            "Total_Margin": getTotalMarginPercent(data.items),
            "Total_Margin_Value": getTotalMargin(data.items),
            "Total_Net_Value_Including_VAT": getTotalWithVat(data.items, data.vat, data.customs),
            "VAT_Value": getTotalVat(data.items, data.vat, data.customs),
            "customs_value": getTotalFright(data.items, data.customs),
        }
    }
    const validate= async () => {
        return await formRef.current.validateForm()
    }
    const generateQuote= async () => {
        let data= await prepareDataBeforeSend(formRef.current.values)
        if(data){
            Inertia.post('/quotes', data)
        }
    }
    const updateQuote= async () => {
        if(quote?.id){
            let data= await prepareDataBeforeSend(formRef.current.values)
            if(data){
                Inertia.put('/quotes/'+quote?.id, data)
            }
        }else{
            toast.error("Please Save the quote first.", {autoClose: 5000});
        }
    }
    const pushQuote= async () => {
        if(quote?.id){
            let data= await prepareDataBeforeSend(formRef.current.values)
            if(data){
                Inertia.post('/deals/'+deal?.id+'/push/quote', data)
            }
        }else{
            toast.error("Please Save the quote first.", {autoClose: 5000});
        }
    }
    const pushDeal= async () => {
        if(quote?.id){
            let data= await prepareDataBeforeSend(formRef.current.values)
            if(data){
                Inertia.post('/deals/'+deal?.id+'/push/deal', data)
            }
        }else{
            toast.error("Please Save the quote first.", {autoClose: 5000});
        }
    }
    const pushAll= async () => {
        if(quote?.id){
            let data= await prepareDataBeforeSend(formRef.current.values)
            if(data){
                Inertia.post('/deals/'+deal?.id+'/push', data)
            }
        }else{
            toast.error("Please Save the quote first.", {autoClose: 5000});
        }
    }
    const request= async () => {
        termsSchema.validate([...formRef.current.values.paymentTerms]).then((value) => {
            let terms= mapTerms(value, formRef.current.values.items)
            Inertia.post('/deals/'+deal?.id+'/push/terms', {
                terms,
                contact: formRef.current.values.contact,
                account: formRef.current.values.account,
                deal_name: formRef.current.values.deal_name,
            })
        }).catch((err) => {
            if(err.errors && err.errors.length > 0)
                toast.error(err.errors.flat(2)[0], {autoClose: 5000});
        });
        // termsSchema.isValid(formRef.current.values.paymentTerms).then((valid) => {
        //     if(valid){
        //         let terms= mapTerms([...formRef.current.values.paymentTerms], formRef.current.values.items)
        //         Inertia.post('/deals/'+deal?.id+'/push/terms', {
        //             terms,
        //             contact: formRef.current.values.contact,
        //             account: formRef.current.values.account,
        //             deal_name: formRef.current.values.deal_name,
        //         })
        //     }
        // }).catch(err => {
        //     toast.error("Please check your input.", {autoClose: 5000});
        // })
    }
    return (
        <>
        <ToastContainer />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                innerRef={formRef}
                onSubmit={onSubmit}>
                <Form>
                    <HeaderComponent updateQuote={updateQuote} quote={quote} quotes={quotes} generateQuote={generateQuote} deal={deal}/>
                    <QuoteBasicInfoComponent quote={quote} pushDeal={pushDeal} pushQuote={pushQuote} pushAll={pushAll} deal={deal}/>
                    <SalesPersonInfoComponent users={users} deal={deal}/>
                    <ContactInfoComponent contacts={contacts} deal={deal}/>
                    <AccountInfoComponent accounts={accounts} deal={deal}/>
                    <AddressInfoComponent contacts={contacts} deal={deal}/>
                    <QuoteOtherInfoComponent deal={deal}/>
                    <FieldArray name="items">
                        {(actions) => (
                            <PricingTableComponent products={products} deal={deal} {...actions}/>
                        )}
                    </FieldArray>
                    <OverviewComponent deal={deal} />
                    <FieldArray name="paymentTerms">
                        {(actions) => (
                            <PaymentTermsComponent request={request} deal={deal} {...actions} />
                        )}
                    </FieldArray>
                    <NotesComponent deal={deal}/>
                </Form>
            </Formik>
        </>
    )
}
