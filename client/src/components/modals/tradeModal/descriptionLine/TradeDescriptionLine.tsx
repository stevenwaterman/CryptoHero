import {ELEMENT} from "../../../../modules/RootStore";
import {formatMoney} from "../../../../util/FormatMoney";
import React from "react";
import {TradeDescriptionLineProps} from "./TradeDescriptionLineContainer";

export default class TradeDescriptionLine extends React.Component<TradeDescriptionLineProps> {
    render(): ELEMENT {
        if (this.props.selfTrade != null) {
            return <p className="text-center">
                <b>
                    {this.otherBuySellString()} exists at {formatMoney(this.props.selfTrade, 5, true, false)}. Would cause self-trade!
                </b>
            </p>
        }
        if (this.props.units.lte(0)) {
            return <p className="text-center"><b>Increase {this.buySellString()} Amount</b></p>;
        } else {
            return <p className="text-center">
                {this.getAction1()} {this.getAmount1()}{this.getAction2()} {this.getAmount2()}
            </p>;
        }
    }

    private buySellString(): string {
        return this.props.buying ? "Buy" : "Sell"
    }

    private otherBuySellString(): string {
        return this.props.buying ? "Sell" : "Buy"
    }

    private getAction1(): ELEMENT {
        if (this.props.buying) {
            if (this.props.price.gt(0)) return "Buying";
            else if (this.props.price.eq(0)) return "Taking";
            else return "Taking";
        } else {
            if (this.props.price.gt(0)) return "Selling";
            else if (this.props.price.eq(0)) return "Giving away";
            else return "Getting rid of";
        }
    }

    private getAmount1(): ELEMENT {
        return <b>{formatMoney(this.props.asset1Amount.abs(), 5, true, true)} {this.props.asset1}</b>
    }

    private getAction2(): ELEMENT {
        if (this.props.buying) {
            if (this.props.price.gt(0)) return ", Paying up to";
            else if (this.props.price.eq(0)) return " for free";
            else return ", getting paid at least ";
        } else {
            if (this.props.price.gt(0)) return " for at least";
            else if (this.props.price.eq(0)) return " for free";
            else return ", costing up to"
        }
    }

    private getAmount2(): ELEMENT {
        if (this.props.price.eq(0)) return "";
        return <b>{formatMoney(this.props.asset2Amount.abs(), 5, true, true)} {this.props.asset2}</b>;
    }
}