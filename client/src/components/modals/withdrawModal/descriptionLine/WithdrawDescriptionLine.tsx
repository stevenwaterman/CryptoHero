import {ELEMENT} from "../../../../modules/RootStore";
import {formatMoney} from "../../../../util/FormatMoney";
import React from "react";
import {WithdrawDescriptionLineProps} from "./WithdrawDescriptionLineContainer";

export default class WithdrawDescriptionLine extends React.Component<WithdrawDescriptionLineProps> {
    render(): ELEMENT {
        if (this.props.units.lte(0)) {
            return <p className="text-center"><b>Increase Withdraw Amount</b></p>;
        } else {
            return <p className="text-center">
                Withdrawing <b>{formatMoney(this.props.units, 5, true, true)} {this.props.asset}</b>
            </p>
        }
    }
}