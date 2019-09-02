import {Button, Modal} from "react-bootstrap";
import {formatMoney} from "../../../../util/FormatMoney";
import React from "react";
import {ELEMENT} from "../../../../modules/RootStore";
import {ViewTradeModalProps} from "../ViewOrderModalContainer";

export default class PendingSell extends React.Component<ViewTradeModalProps> {
    render(): ELEMENT {
        const {averagePrice, id, instrument, remainingUnits, time, unitPrice, units} = this.props.trade;
        const average = averagePrice == null ? 0 : averagePrice;
        const gained = average * (units - remainingUnits);
        return <>
            <Modal.Body>
                <b>ID:</b> {id}<br/>
                <b>Submitted:</b> {time.toLocaleString()}<br/>
                <b>Action:</b> SELL {instrument.name}<br/>
                <b>Selling:</b> {formatMoney(units, 5, true, true)} {instrument.asset2}<br/>
                <b>Unit Price:</b> {formatMoney(unitPrice, 5, true, false)}<br/>
                <b>Expected:</b> {formatMoney(units * unitPrice, 5, true, true)} {instrument.asset1}<br/>
                <hr className="col-12"/>
                <b>Sold:</b> {formatMoney(units - remainingUnits, 5, true, true)} {instrument.asset2}<br/>
                <b>Remaining:</b> {formatMoney(remainingUnits, 5, true, true)} {instrument.asset2}<br/>
                <b>Progress:</b> {formatMoney(100 - (100 * remainingUnits / units), 2, false, true)}%<br/>
                <hr className="col-12"/>
                <b>Average Price:</b> {formatMoney(average, 5, true, false)}<br/>
                <b>Gained:</b> {formatMoney(gained, 5, true, true)} {instrument.asset1}<br/>
                <b>Expecting:</b> {formatMoney(remainingUnits * unitPrice, 5, true, true)} {instrument.asset1}<br/>
                <b>Total:</b> {formatMoney(gained + remainingUnits * unitPrice, 5, true, true)} {instrument.asset1}<br/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onClickCancel}>Cancel Order</Button>
            </Modal.Footer>
        </>
    }
}