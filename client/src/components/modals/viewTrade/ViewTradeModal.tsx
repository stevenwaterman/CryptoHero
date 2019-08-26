import {ELEMENT} from "../../../state/store/RootStore";
import React from "react";
import {formatMoney} from "../../../util/FormatMoney";
import {ViewTradeModalProps} from "./ViewTradeModalContainer";
import {Button, Modal} from "react-bootstrap";

export default class ViewTradeModal extends React.Component<ViewTradeModalProps> {
    render(): ELEMENT {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Order Info</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>ID:</b> {this.props.id}
                    <b>Time:</b> {this.props.time.toISOString()}
                    <b>Action:</b> {this.props.buying ? "BUY " : "SELL "} {this.props.instrument.name}
                    <b>Units:</b> {formatMoney(this.props.units, 5, true, true)}
                    <b>Unit Price:</b> {formatMoney(this.props.price, 5, true, true)}
                    <b>Allocated:</b> 148,087.5 BTC //TODO
                    <hr className="col-12"/>
                    <b>Remaining Units:</b> 112,874.57
                    <b>Locked:</b> 111,435.41923 BTC
                    <b>Progress:</b> 24.75%
                    <b>Average Price:</b> 0.98623
                    <b>Spent:</b> 36,614.21283 BTC
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onClickCancel}>Cancel Order</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}