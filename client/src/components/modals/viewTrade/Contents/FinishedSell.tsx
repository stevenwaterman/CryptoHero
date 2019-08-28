import {Button, Modal} from "react-bootstrap";
import {formatMoney} from "../../../../util/FormatMoney";
import React from "react";
import {ELEMENT} from "../../../../modules/RootStore";
import Order from "../../../../models/Order";
import {ViewTradeModalProps} from "../ViewTradeModalContainer";

export default class FinishedSell extends React.PureComponent<ViewTradeModalProps> {
    render(): ELEMENT {
        const {averagePrice, id, instrument, time, unitPrice, units} = this.props.trade;
        return <>
            <Modal.Body>
                <b>ID:</b> {id}<br/>
                <b>Submitted:</b> {time.toLocaleString()}<br/>
                <b>Action:</b> SELL {instrument.name}<br/>
                <b>Sold:</b> {formatMoney(units, 5, true, true)} {instrument.asset2}<br/>
                <b>Asked:</b> {formatMoney(unitPrice, 5, true, false)}<br/>
                <b>Average Price:</b> {formatMoney(averagePrice, 5, true, false)}<br/>
                <hr className="col-12"/>
                <b>Expected:</b> {formatMoney(units * unitPrice, 5, true, true)} {instrument.asset1}<br/>
                <b>Gained:</b> {formatMoney(averagePrice * units, 5, true, true)} {instrument.asset1}<br/>
            </Modal.Body>
        </>
    }
}