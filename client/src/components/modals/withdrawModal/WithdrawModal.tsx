import React from "react";
import {ELEMENT} from "../../../modules/RootStore";
import {WithdrawModalProps} from "./WithdrawModalContainer";
import UnitFieldContainer from "./fields/WithdrawUnitFieldContainer";
import PercentFieldContainer from "./fields/WithdrawPercentFieldContainer";
import WithdrawAssetSelectorContainer from "./WithdrawAssetSelectorContainer";
import {Button, Col, Form, Modal} from "react-bootstrap";
import WithdrawDescriptionLine from "./descriptionLine/WithdrawDescriptionLineContainer";

export default class WithdrawModal extends React.Component<WithdrawModalProps> {
    render(): ELEMENT {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title><b>Withdraw Funds</b> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Row>
                                <Col sm="2" className="my-auto px-0">
                                    Asset:
                                </Col>
                                <Col sm="auto">
                                    <WithdrawAssetSelectorContainer/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Col sm="2" className="my-auto px-0">
                                    Withdraw
                                </Col>
                                <Col sm="5" className="mt-2 mt-sm-0">
                                    <UnitFieldContainer step={0.00001}/>
                                </Col>
                                <Col sm="1" className="my-auto px-0 text-center">
                                    =
                                </Col>
                                <Col sm="4" className="mt-2 mt-sm-0">
                                    <PercentFieldContainer step={0.01}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                    <hr className="col-12"/>
                    <WithdrawDescriptionLine/>
                    <p className="text-center">The amount will be withdrawn from your account instantly</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" disabled={!this.props.canConfirm} onClick={this.props.onConfirm}>
                        Confirm Withdrawal
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
