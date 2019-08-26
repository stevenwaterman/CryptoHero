import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {InstrumentCardProps} from "./InstrumentCardContainer";
import {formatMoney} from "../../../util/FormatMoney";

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

export default class InstrumentCard extends React.PureComponent<InstrumentCardProps> {
    render(): ELEMENT {
        return (
            <div className={`card ${borderColor(this.props.selected)} pt-1`} onClick={this.props.onCardClick}>
                <h5 className={`card-title text-center ${textColor(this.props.selected)}`}>
                    <b>{this.props.instrument.name}</b></h5>
                <p className={`card-text text-center ${textColor(this.props.selected)}`}>{formatMoney(this.props.price, 5, true, false)}</p>
                <div className="row mb-1 mx-0">
                    <div className="col-6 px-1">
                        <button className="btn btn-success btn-block btn-sm pl-1 pb-1" data-target="#tradeModal"
                                data-toggle="modal" type="button" onClick={this.props.onBuyClick}>Buy
                        </button>
                    </div>
                    <div className="col-6 px-1">
                        <button className="btn btn-danger btn-block btn-sm pr-1 pb-1" data-target="#tradeModal"
                                data-toggle="modal" type="button" onClick={this.props.onSellClick}>Sell
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
