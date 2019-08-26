import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {InstrumentCardProps} from "./InstrumentCardContainer";
import {formatMoney} from "../../../util/FormatMoney";
import {Button, Card, Col, Row} from "react-bootstrap";

export default class InstrumentCard extends React.PureComponent<InstrumentCardProps> {
    render(): ELEMENT {
        return (
            <Card
                text={this.props.selected ? "primary" : undefined}
                border={this.props.selected ? "primary" : undefined}
                className="text-center pt-1"
                onClick={this.props.onCardClick}
            >
                <Card.Title><b> {this.props.instrument.name} </b></Card.Title>
                <Card.Text>
                    {formatMoney(this.props.price, 5, true, false)}
                </Card.Text>
                <Row className="mb-1 mx-0">
                    <Col className="px-1">
                        <Button variant="success" block={true} size="sm" className="pl-1 pb-1"
                                onClick={this.props.onBuyClick}>Buy</Button>
                    </Col>
                    <Col className="px-1">
                        <Button variant="danger" block={true} size="sm" className="pr-1 pb-1"
                                onClick={this.props.onSellClick}>Sell</Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}
