import {Button, Modal} from "react-bootstrap";
import {formatMoney} from "../../../../util/FormatMoney";
import React from "react";
import {ELEMENT} from "../../../../modules/RootStore";
import {ViewTradeModalProps} from "../ViewOrderModalContainer";
import Big from "big.js";

export default class PendingBuy extends React.Component<ViewTradeModalProps> {
    render(): ELEMENT {
        const {averagePrice, id, instrument, remainingUnits, time, unitPrice, units} = this.props.trade;
        const average = averagePrice == null ? Big(0) : averagePrice;
        return <>
            <Modal.Body>
                <b>ID:</b> {id}<br/>
                <b>Submitted:</b> {time.toLocaleString()}<br/>
                <b>Action:</b> BUY {instrument.name}<br/>
                <b>Buying:</b> {formatMoney(units, 5, true, true)} {instrument.asset1}<br/>
                <b>Unit Price:</b> {formatMoney(unitPrice, 5, true, false)}<br/>
                <b>Allocated:</b> {formatMoney(units.mul(unitPrice), 5, true, true)} {instrument.asset2}<br/>
                <hr className="col-12"/>
                <b>Bought:</b> {formatMoney(units.sub(remainingUnits), 5, true, true)} {instrument.asset1}<br/>
                <b>Remaining:</b> {formatMoney(remainingUnits, 5, true, true)} {instrument.asset1}<br/>
                <b>Progress:</b> {formatMoney(Big(100).sub(remainingUnits.div(units).mul(100)), 2, false, true)}%<br/>
                <b>Locked:</b> {formatMoney(remainingUnits.mul(unitPrice), 5, true, true)} {instrument.asset2}<br/>
                <hr className="col-12"/>
                <b>Average Price:</b> {formatMoney(average, 5, true, false)}<br/>
                <b>Spent:</b> {formatMoney(average.mul(units.sub(remainingUnits)), 5, true, true)} {instrument.asset2}<br/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onClickCancel}>Cancel Order</Button>
            </Modal.Footer>
        </>
    }
}