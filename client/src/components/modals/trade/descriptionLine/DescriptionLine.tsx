import {ELEMENT} from "../../../../state/store/RootStore";
import {formatMoney} from "../../../../util/FormatMoney";
import React from "react";
import {DescriptionLineProps} from "./DescriptionLineContainer";

export default class DescriptionLine extends React.PureComponent<DescriptionLineProps> {
    private buySellString(): string{
        return this.props.buying ? "Buy" : "Sell"
    }

    private getAction1(): ELEMENT{
        if (this.props.buying) {
            if (this.props.price > 0) return  "Buying";
            else if (this.props.price === 0) return  "Taking";
            else return  "Taking";
        } else {
            if (this.props.price > 0) return "Selling";
            else if (this.props.price === 0) return "Giving away";
            else return "Getting rid of";
        }
    }

    private getAmount1(): ELEMENT{
        return <b>{formatMoney(Math.abs(this.props.asset1Amount), 5, true, true)} {this.props.asset1}</b>
    }

    private getAction2(): ELEMENT{
        if (this.props.buying) {
            if (this.props.price > 0) return  ", Paying up to";
            else if (this.props.price=== 0) return  " for free";
            else return ", getting paid at least ";
        } else {
            if (this.props.price > 0) return  " for at least";
            else if (this.props.price === 0) return  " for free";
            else return  ", costing up to"
        }
    }

    private getAmount2(): ELEMENT{
        if(this.props.price === 0) return "";
        return <b>{formatMoney(Math.abs(this.props.asset2Amount), 5, true, true)} {this.props.asset2}</b>;
    }

    render() {
        if (this.props.units <= 0) {
            return <p className="text-center"><b>Increase {this.buySellString()} Amount</b></p>;
        } else {
            return <p className="text-center">
                {this.getAction1()} {this.getAmount1()}{this.getAction2()} {this.getAmount2()}
            </p>;
        }
    }
}