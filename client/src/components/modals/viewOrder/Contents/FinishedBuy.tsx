import {Button, Modal} from "react-bootstrap";
import {formatMoney} from "../../../../util/FormatMoney";
import React from "react";
import {ELEMENT} from "../../../../modules/RootStore";
import {ViewTradeModalProps} from "../ViewOrderModalContainer";

export default class FinishedBuy extends React.Component<ViewTradeModalProps> {
    render(): ELEMENT {
        const {averagePrice, id, instrument, remainingUnits, time, unitPrice, units} = this.props.trade;
        let average = averagePrice == null ? 0 : averagePrice;
        return <>
            <Modal.Body>
                <b>ID:</b> {id}<br/>
                <b>Submitted:</b> {time.toLocaleString()}<br/>
                <b>Action:</b> BUY {instrument.name}<br/>
                <b>Bought:</b> {formatMoney(units, 5, true, true)} {instrument.asset1}<br/>
                <b>Bid:</b> {formatMoney(unitPrice, 5, true, false)}<br/>
                <b>Average Price:</b> {formatMoney(average, 5, true, false)}<br/>
                <hr className="col-12"/>
                <b>Allocated:</b> {formatMoney(units * unitPrice, 5, true, true)} {instrument.asset2}<br/>
                <b>Spent:</b> {formatMoney(average * (units - remainingUnits), 5, true, true)} {instrument.asset2}<br/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onClickCancel}>Cancel Order</Button>
            </Modal.Footer>
        </>
    }
}