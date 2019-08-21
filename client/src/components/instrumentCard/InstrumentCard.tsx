import React from "react";
import {ELEMENT} from "../../state/store";

export interface InstrumentCardProps {
    instrument: string,
    price: string,
    selected: boolean
}

function borderColor(selected: boolean): string {
    if (selected) {
        return "border-primary"
    } else {
        return "";
    }
}

function textColor(selected: boolean): string {
    if (selected) {
        return "text-primary"
    } else {
        return "";
    }
}

export default class InstrumentCard extends React.Component<InstrumentCardProps> {
    render(): ELEMENT {
        return (
            <div className={`card ${borderColor(this.props.selected)} pt-1`}>
                <h5 className={`card-title text-center ${textColor(this.props.selected)}`}>
                    <b>{this.props.instrument}</b></h5>
                <p className={`card-text text-center ${textColor(this.props.selected)}`}>{this.props.price}</p>
                <div className="row mb-1 mx-0">
                    <div className="col-6 px-1">
                        <button className="btn btn-success btn-block btn-sm pl-1 pb-1" data-target="#tradeModal"
                                data-toggle="modal" type="button">Buy
                        </button>
                    </div>
                    <div className="col-6 px-1">
                        <button className="btn btn-danger btn-block btn-sm pr-1 pb-1" data-target="#tradeModal"
                                data-toggle="modal" type="button">Sell
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
