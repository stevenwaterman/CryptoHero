import React from "react";
import {ELEMENT} from "../../../modules/RootStore";
import Order from "../../../models/Order";
import {formatMoney} from "../../../util/FormatMoney";

export interface OrderRowProps {
    onClick: (order: Order) => void
    order: Order
}

function getClass(buying: boolean): string {
    if (buying) return "table-success";
    else return "table-danger";
}

export default class OrderRow extends React.PureComponent<OrderRowProps> {
    render(): ELEMENT {
        return (
            <tr className={getClass(this.props.order.isBuy)} onClick={() => this.props.onClick(this.props.order)}>
                <td>{this.props.order.time.toLocaleString()}</td>
                <td>{formatMoney(this.props.order.units, 5, true, true)}</td>
                <td>{formatMoney(this.props.order.unitPrice, 5, true, true)}</td>
            </tr>
        );
    }
}