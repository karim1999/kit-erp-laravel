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
    const settings= {
        infinite: false,
        // rows: 0,
        slidesToShow: 10,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        draggable: true,
        touchMove: true,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 12,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 9,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }
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
                            <div className="col-xl-2 col-lg-2 col-sm-2 col-2">
                                <SelectFieldComponent className="custom-select" label="Quote Approval Status" disabled name="approval_status">
                                    {
                                        Constants.approvalStatusTypes.map(status => <option key={status.value} value={status.value}>{status.value}</option>)
                                    }
                                </SelectFieldComponent>
                            </div>
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
                                <button disabled={deal.Stage ? deal.Stage.startsWith("Closed") : false} onClick={() => generateQuote()} type="button" className="btn btn-success btn-sm">Generate Quote</button>
                                {
                                    quote &&
                                        <button onClick={() => pushAll()} type="button" className="btn btn-warning btn-sm ml-3">Push All</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-12 text-right">
                        <label>&nbsp;</label>
                        <div className="clearfix"></div>
                        {
                            quote &&
                            <InertiaLink href={"/deals/"+deal.id} method="get" as="button" type="button" className="btn btn-primary btn-sm">
                                Back to Deal
                            </InertiaLink>
                        }
                        {/*<button type="button" className="btn btn-primary btn-sm">Back to Deal</button>*/}
                    </div>
                </div>
                <hr />
                {
                    quotes && quotes.length > 0 &&
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                            <label>Quote Version</label>
                            <Slider {...settings}>
                                {
                                    quotes.map(quote => (
                                        <InertiaLink key={quote.id} href={"/quotes/"+quote.id} method="get" as="div" type="button">
                                            <span className={`horizontal-span ${quote.id === quoteId.value && 'active'}`}>
                                                {quote.quote_no}
                                            </span>
                                        </InertiaLink>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
