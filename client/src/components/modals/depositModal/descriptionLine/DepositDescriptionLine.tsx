import {ELEMENT} from "../../../../state/store/RootStore";
import {formatMoney} from "../../../../util/FormatMoney";
import React from "react";
import {DepositDescriptionLineProps} from "./DepositDescriptionLineContainer";

export default class DepositDescriptionLine extends React.PureComponent<DepositDescriptionLineProps> {
    render(): ELEMENT {
        if(this.props.units <= 0){
            return <p className="text-center"><b>Increase Deposit Amount</b></p>;
        }
        else {
            return <p className="text-center">
                Depositing <b>{formatMoney(this.props.units, 5, true, true)} {this.props.asset}</b>
            </p>
        }
    }
}