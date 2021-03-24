import React, { useState, useEffect } from "react";
import TextAreaFieldComponent from "./Fields/TextAreaFieldComponent";

export default function ({deal}) {
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                    <TextAreaFieldComponent label="Quote Notes" className="form-control" rows="5" name="notes" />
                </div>
            </div>
        </div>
    )
}
