import React, { useState, useEffect } from "react";
import { Formik, Form, useField, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Constants from "../../helpers/samples";
import {precise, calculateItemDiscount, calculateItemMargin} from "../../helpers/helpers";
import HeaderComponent from "./Components/HeaderComponent";
import QuoteBasicInfoComponent from "./Components/QuoteBasicInfoComponent";
import SalesPersonInfoComponent from "./Components/SalesPersonInfoComponent";
import ContactInfoComponent from "./Components/ContactInfoComponent";
import AccountInfoComponent from "./Components/AccountInfoComponent";
import AddressInfoComponent from "./Components/AddressInfoComponent";
import PricingTableComponent from "./Components/PricingTableComponent";
import QuoteOtherInfoComponent from "./Components/QuoteOtherInfoComponent";

export default function Show({ current_quote_id, current_deal_id, current_deal= Constants.sampleOpportunity, current_quotes= [], current_quote= null, contactsObj= {}, usersObj= {}, accountsObj= {}, productsObj= {} }) {
    const [deal, setDeal]= useState({...current_deal.data[0]});
    const [users, setUsers]= useState(usersObj.users);
    const [contacts, setContacts]= useState(contactsObj.data);
    const [accounts, setAccounts]= useState(accountsObj.data);
    const [products, setProducts]= useState(productsObj.data);

    console.log({deal});
    console.log({contacts});
    console.log({accounts});

    const initialValues= {
        status: Constants.statusTypes[0].value,
        approvalStatus: Constants.approvalStatusTypes[0].value,
        salesPerson: users.find(user => user.id === deal.Owner.id)?.id,
        contact: contacts.find(contact => contact.id === deal.Contact_Name.id)?.id,
        account: accounts.find(account => account.id === deal.Account_Name.id)?.id,
        includeShipping: false,
        includeBilling: true,
        Deal_Name: deal.Deal_Name,
        valid_from: new Date(),
        valid_to: new Date(),
        description: "",
        items: []
    }
    const validationSchema= Yup.object({
        status: Yup.string()
            .required('Required')
            .oneOf(Constants.statusTypes.map(status => status.value)),
        approvalStatus: Yup.string()
            .required('Required')
            .oneOf(Constants.approvalStatusTypes.map(status => status.value)),
    })

    const onSubmit= (values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form>
                    <HeaderComponent deal={deal}/>
                    <QuoteBasicInfoComponent deal={deal}/>
                    <SalesPersonInfoComponent users={users} deal={deal}/>
                    <ContactInfoComponent contacts={contacts} deal={deal}/>
                    <AccountInfoComponent accounts={accounts} deal={deal}/>
                    <AddressInfoComponent deal={deal}/>
                    <QuoteOtherInfoComponent deal={deal}/>
                    <FieldArray name="items">
                        {(actions) => (
                            <PricingTableComponent products={products} deal={deal} {...actions}/>
                        )}
                    </FieldArray>
                </Form>
            </Formik>
        </>
    )
}
