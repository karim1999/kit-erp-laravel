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
import OverviewComponent from "./Components/OverviewComponent";
import PaymentTermsComponent from "./Components/PaymentTermsComponent";
import NotesComponent from "./Components/NotesComponent";

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
        quote_no: "",
        status: Constants.statusTypes[0].value,
        approval_status: Constants.approvalStatusTypes[0].value,
        sales_person: users.find(user => user.id === deal.Owner.id)?.id,
        contact: contacts.find(contact => contact.id === deal.Contact_Name.id)?.id,
        account: accounts.find(account => account.id === deal.Account_Name.id)?.id,
        include_shipping: false,
        include_billing: true,
        shipping: {},
        billing: {},
        deal_name: deal.Deal_Name,
        valid_from: new Date(),
        valid_to: new Date(),
        description: "",
        items: [],
        notes: "",
        paymentTerms: [],
        vat: 0,
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
        console.log(values)
        // alert(JSON.stringify(values, null, 2));
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
