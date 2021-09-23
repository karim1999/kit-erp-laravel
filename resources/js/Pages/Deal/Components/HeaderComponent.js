import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { InertiaLink } from '@inertiajs/inertia-react'
import {useField} from "formik";

export default function ({deal, generateQuote, updateQuote, quotes, quote, pushAll}){
    const [quoteId] = useField(`quote_id`);
    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip();
    }, [])
    return (
        <div className="jumbotron jumbotron-fluid sticky-top">
            <div className="container">
                <div className="row g-0">
                    <div className="col-xl-10 col-lg-10 col-sm-10 col-12">
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 col-2">
                                <div className="form-group">
                                    <label>Deal Owner</label>
                                    <input type="text" className="form-control" value={deal.Owner.name} disabled />
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 col-2">
                                <div className="form-group">
                                    <label>Deal Stage</label>
                                    <input type="text" className="form-control" value={deal.Stage} disabled />
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 col-2">
                                <div className="form-group">
                                    <label>Deal ID No.</label>
                                    <input type="text" className="form-control datepicker" value={deal.Opportunity_Auto_No} disabled />
                                </div>
                            </div>
                            {/*<div className="col-xl-2 col-lg-2 col-sm-2 col-2">*/}
                            {/*    <SelectFieldComponent className="custom-select" label="Quote Approval Status" disabled name="approval_status">*/}
                            {/*        {*/}
                            {/*            Constants.approvalStatusTypes.map(status => <option key={status.value} value={status.value}>{status.value}</option>)*/}
                            {/*        }*/}
                            {/*    </SelectFieldComponent>*/}
                            {/*</div>*/}
                            {/*{*/}
                            {/*    quote &&*/}
                            {/*    <div className="col-xl-2 col-lg-2 col-sm-2 col-2 text-right">*/}
                            {/*        <label>&nbsp;</label>*/}
                            {/*        <div className="clearfix"></div>*/}
                            {/*        <button onClick={() => updateQuote()} type="button" className="btn btn-warning btn-sm">Update Quote</button>*/}
                            {/*    </div>*/}
                            {/*}*/}
                            <div className="col-xl-4 col-lg-4 col-sm-4 col-2">
                                <label>&nbsp;</label>
                                <div className="clearfix"></div>
                                <button data-toggle="tooltip" data-placement="top" title="Generates a Quote in the ERP without pushing anything to Zoho CRM" disabled={deal.Stage ? deal.Stage.startsWith("Closed") : false} onClick={() => generateQuote()} type="button" className="btn btn-success btn-sm">Generate Quote</button>
                                {
                                    quote &&
                                        <button data-toggle="tooltip" data-placement="top" title="Updates the deals information and creates a new quote for the deal in Zoho CRM" onClick={() => pushAll()} type="button" className="btn btn-warning btn-sm ml-3">Push All</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-12 text-right">
                        <label>&nbsp;</label>
                        <div className="clearfix"></div>
                        {
                            quote &&
                            <InertiaLink data-toggle="tooltip" data-placement="top" title="Go Back in the ERP module to the deal's page" href={"/deals/"+deal.id} method="get" as="button" type="button" className="btn btn-primary btn-sm">
                                Go Back
                            </InertiaLink>
                        }
                        {/*<button type="button" className="btn btn-primary btn-sm">Back to Deal</button>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
