import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {DepositModalProps} from "./DepositModalContainer";
import UnitFieldContainer from "./DepositUnitFieldContainer";
import AssetSelectorContainer from "./DepositAssetSelectorContainer";
import {Button, Col, Form, Modal} from "react-bootstrap";

export default class DepositModal extends React.PureComponent<DepositModalProps> {
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
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Form>
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
