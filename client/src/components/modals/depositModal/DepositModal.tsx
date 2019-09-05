import React from "react";
import {ELEMENT} from "../../../modules/RootStore";
import {DepositModalProps} from "./DepositModalContainer";
import UnitFieldContainer from "./DepositUnitFieldContainer";
import AssetSelectorContainer from "./DepositAssetSelectorContainer";
import {Button, Col, Form, Modal} from "react-bootstrap";
import DepositDescriptionLine from "./descriptionLine/DepositDescriptionLineContainer";

export default class DepositModal extends React.Component<DepositModalProps> {
    render(): ELEMENT {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title><b>Deposit Funds</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Row>
                                <Col sm="2" className="my-auto px-0">
                                    Asset:
                                </Col>
                                <Col sm="auto">
                                    <AssetSelectorContainer/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Col sm="2" className="my-auto px-0">
                                    Deposit
                                </Col>
                                <Col sm="auto" className="mt-2 mt-sm-0">
                                    <UnitFieldContainer step={0.00001}/>
                                    <input type="text" name="StackOverflow1370021" value="Fix IE bug" hidden={true}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                    <hr className="col-12"/>
                    <DepositDescriptionLine/>
                    <p className="text-center">The amount will be deposited into your account instantly</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" disabled={!this.props.canConfirm} onClick={this.props.onConfirm}>
                        Confirm Deposit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
