import React, { useState, useEffect } from "react";
import Constants from "../../../helpers/samples";
import SelectFieldComponent from "./Fields/SelectFieldComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ({deal}){
    const settings= {
        infinite: true,
        // rows: 0,
        // slidesToShow: 10,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        draggable: true,
        touchMove: true
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
                                <SelectFieldComponent className="custom-select" label="Quote Approval Status" name="approvalStatus">
                                    {
                                        Constants.approvalStatusTypes.map(status => <option key={status.value} value={status.value}>{status.value}</option>)
                                    }
                                </SelectFieldComponent>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 col-2 text-right">
                                <label>&nbsp;</label>
                                <div className="clearfix"></div>
                                <button type="button" className="btn btn-warning btn-sm">Request Approval</button>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 col-2">
                                <label>&nbsp;</label>
                                <div className="clearfix"></div>
                                <button type="submit" className="btn btn-success btn-sm">Generate Quote</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-sm-2 col-12 text-right">
                        <label>&nbsp;</label>
                        <div className="clearfix"></div>
                        <button type="button" className="btn btn-primary btn-sm">Back to Deal</button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                        <label>Quote Version</label>
                        <Slider {...settings}>
                            <div>
                                <span className="horizontal-span">
                                    QT-1234-V1-DDMMYY
                                </span>
                            </div>
                            <div>
                                <span className="horizontal-span">
                                    QT-1234-V1-DDMMYY
                                </span>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}
