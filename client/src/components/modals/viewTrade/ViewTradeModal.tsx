import {ELEMENT} from "../../../state/store/RootStore";
import React from "react";
import {ViewTradeModalProps} from "./ViewTradeModalContainer";
import {Button, Modal} from "react-bootstrap";

export default class ViewTradeModal extends React.Component<ViewTradeModalProps> {
    render(): ELEMENT {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title><b>Order Info</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>ID:</b> {this.props.trade.id}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onClickCancel}>Cancel Order</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}