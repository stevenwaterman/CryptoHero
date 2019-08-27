import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {TradeModalProps} from "./TradeModalContainer";
import UnitFieldContainer from "./fields/TraeUnitFieldContainer";
import PriceFieldContainer from "./fields/TradePriceFieldContainer";
import PercentFieldContainer from "./fields/TradePercentFieldContainer";
import DescriptionLineContainer from "./descriptionLine/DescriptionLineContainer";
import {Button, Col, Form, Modal} from "react-bootstrap";

function maxMinPriceString(buying: boolean): string {
    return buying ? "Max" : "Min";
}

function buySellString(buying: boolean): string {
    return buying ? "Buy" : "Sell";
}

export default class TradeModal extends React.PureComponent<TradeModalProps> {
    render(): ELEMENT {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title><b>{this.props.sourceAsset} &rarr; {this.props.targetAsset}</b> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Row>
                                <Col sm="3" className="my-auto px-0">
                                    {maxMinPriceString(this.props.buying)} price
                                </Col>
                                <Col sm="9" className="mt-2 mt-sm-0">
                                    <PriceFieldContainer step={0.00001}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Col sm="1" className="my-auto px-0">
                                    {buySellString(this.props.buying)}
                                </Col>
                                <Col sm="5" className="mt-2 mt-sm-0">
                                    <UnitFieldContainer step={0.00001}/>
                                </Col>
                                <Col sm="1" className="my-auto px-0 text-center">
                                    for
                                </Col>
                                <Col sm="5" className="mt-2 mt-sm-0">
                                    <PercentFieldContainer step={0.01}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                    <hr className="col-12"/>
                    <DescriptionLineContainer/>
                    <p>This amount will be immediately deducted from your available funds and may be
                        partially refunded if trades happen at under the max price. The order can be cancelled at any
                        time, refunding any allocated funds.</p>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Button variant="danger" disabled={!this.props.canConfirm} onClick={this.props.onConfirm}>Confirm Trade</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
