import {ELEMENT} from "../../../state/store/RootStore";
import React from "react";
import {formatMoney} from "../../../util/FormatMoney";
import {TotalFundsModalProps} from "./TotalFundsModalContainer";
import {Col, Modal, Row} from "react-bootstrap";

function generateColumns(funds: Map<string, number>): Array<any> {
    const columns: Array<any> = [];
    funds.forEach((value, asset) => columns.push(generateOneColumn(asset, value)));
    return columns;
}

function generateOneColumn(asset: string, price: number): ELEMENT {
    return (
        <Col lg="6" key={asset}>
            <Row>
                <Col className="pr-1">
                    <b>{asset}:</b>
                </Col>
                <Col className="pl-1 text-right">
                    {formatMoney(price, 2, true, false)}
                </Col>
            </Row>
        </Col>
    )
}

export default class TotalFundsModal extends React.Component<TotalFundsModalProps> {
    render(): ELEMENT {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Total Funds</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>If you cancelled all pending orders, you would have:</p>
                    <Row className="py-2 px-2">
                        {generateColumns(this.props.totalFunds)}
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

