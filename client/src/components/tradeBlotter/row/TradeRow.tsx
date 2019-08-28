import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import Trade from "../../../models/Trade";
import {formatMoney} from "../../../util/FormatMoney";

export interface TradeRowProps {
    onClick: (id: string) => void
    trade: Trade
}

function getClass(buying: boolean): string {
    if (buying) return "table-success";
    else return "table-danger";
}

export default class TradeRow extends React.PureComponent<TradeRowProps> {
    render(): ELEMENT {
        return (
            <tr className={getClass(this.props.trade.isBuy)} onClick={() => this.props.onClick(this.props.trade.id)}>
                <td>{this.props.trade.time.toLocaleString()}</td>
                <td>{formatMoney(this.props.trade.units, 5, true, true)}</td>
                <td>{formatMoney(this.props.trade.unitPrice, 5, true, true)}</td>
            </tr>
        );
    }
}