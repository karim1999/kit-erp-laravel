import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, useField, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Constants from "../../helpers/samples";
import {precise, calculateItemDiscount, calculateItemMargin, mapTerms, mapItems} from "../../helpers/helpers";
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
export default function Show({ quote, current_deal_id, current_deal= Constants.sampleOpportunity, quotes= [], contactsObj= {}, usersObj= {}, accountsObj= {}, productsObj= {} }) {
    const [deal, setDeal]= useState({...current_deal.data[0]});
    const [users, setUsers]= useState(usersObj.users);
    const [contacts, setContacts]= useState(contactsObj.data);
    const [accounts, setAccounts]= useState(accountsObj.data);
    const [products, setProducts]= useState(productsObj.data);
    const formRef = useRef();
    const { flash  } = usePage().props

    console.log({deal});
    console.log({contacts});
    console.log({accounts});

    useEffect(() => {
        if (flash){
            console.log({flash})
            toast(flash.msg, {autoClose: 5000, type: flash.type});
        }
    }, [flash])

    const initialValues= {
        quote_no: getInitData(quote?.quote_no, ""),
        status:  getInitData(quote?.status, Constants.statusTypes[0].value),
        approval_status: getInitData(quote?.approval_status, Constants.approvalStatusTypes[0].value),
        sales_person: getInitData(quote?.sales_person, users.find(user => user.id === deal.Owner.id)?.id),
        contact: getInitData(quote?.contact, contacts.find(contact => contact.id === deal.Contact_Name.id)?.id),
        account: getInitData(quote?.account, accounts.find(account => account.id === deal.Account_Name.id)?.id),
        include_shipping: getInitData(quote?.include_shipping, false),
        include_billing: getInitData(quote?.include_billing, true),
        shipping: getInitData(quote?.shipping, Constants.sampleShipping),
        billing: getInitData(quote?.billing, Constants.sampleBilling),
        deal_name: getInitData(quote?.deal_name, deal.Deal_Name),
        valid_from: getInitData(quote?.valid_from, new Date()),
        valid_to: getInitData(quote?.valid_to, new Date()),
        description: getInitData(quote?.description, ""),
        items: getInitArrayData(quote?.items, [], Constants.samplePricingItem),
        notes: getInitData(quote?.notes, ""),
        paymentTerms: getInitArrayData(quote?.terms, [], Constants.samplePricingTerm),
        vat: getInitData(quote?.vat, 0),
    }

    useEffect(() => {
        if (quote){
            formRef.current.setValues(initialValues)
        }
    }, [quote])

    const validationSchema= Yup.object({
        status: Yup.string()
            .required('Required')
            .oneOf(Constants.statusTypes.map(status => status.value)),
        approvalStatus: Yup.string()
            .required('Required')
            .oneOf(Constants.approvalStatusTypes.map(status => status.value)),
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
    const prepareDataBeforeSend= (data) => {
        let paymentTermsTemp= mapTerms([...data.paymentTerms], data.items)
        let itemsTemp= mapItems([...data.items])
        return {
            ...data,
            terms: paymentTermsTemp,
            items: itemsTemp,
            zoho_id: current_deal_id
        }
    }
    const generateQuote= () => {
        let data= prepareDataBeforeSend(formRef.current.values)
        Inertia.post('/quotes', data)
    }
    const updateQuote= () => {
        if(quote?.id){
            let data= prepareDataBeforeSend(formRef.current.values)
            Inertia.put('/quotes/'+quote?.id, data)
        }else{
            toast.error("Please Save the quote first.", {autoClose: 5000});
        }
    }
    const pushQuote= () => {
        if(quote?.id){
            let data= prepareDataBeforeSend(formRef.current.values)
            Inertia.post('/deals/'+deal?.id+'/push/quote', data)
        }else{
            toast.error("Please Save the quote first.", {autoClose: 5000});
        }
    }
    const pushDeal= () => {
        if(quote?.id){
            let data= prepareDataBeforeSend(formRef.current.values)
            Inertia.post('/deals/'+deal?.id+'/push/deal', data)
        }else{
            toast.error("Please Save the quote first.", {autoClose: 5000});
        }
    }
    const pushAll= () => {
        if(quote?.id){
            let data= prepareDataBeforeSend(formRef.current.values)
            Inertia.post('/deals/'+deal?.id+'/push', data)
        }else{
            toast.error("Please Save the quote first.", {autoClose: 5000});
        }
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
                            <PaymentTermsComponent deal={deal} {...actions} />
                        )}
                    </FieldArray>
                    <NotesComponent deal={deal}/>
                </Form>
            </Formik>
        </>
    )
}
