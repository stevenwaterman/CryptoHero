import React from "react";
import {ChartCardProps} from "./TradeBlotterContainer";
import {ELEMENT} from "../../modules/RootStore";
import OrderRow from "./row/OrderRow";
import {Card, Col, Row, Table, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import Order from "../../models/Order";

export default class TradeBlotter extends React.Component<ChartCardProps> {
    render(): ELEMENT {
        return (
            <Card className="mt-3" id="trades">
                <Card.Header>
                    <Row className="justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <Card.Title className="text-center my-0"><b>Trades</b></Card.Title>
                        </Col>
                        <Col xs="auto">
                            <ToggleButtonGroup name="tradeType" type="radio" value={this.props.showState}
                                               onChange={this.props.onSetCategory}>
                                <ToggleButton disabled={!this.props.canSelectPending}
                                              value={"pending"}>Pending</ToggleButton>
                                <ToggleButton disabled={!this.props.canSelectComplete}
                                              value={"complete"}>Completed</ToggleButton>
                                <ToggleButton disabled={!this.props.canSelectCancelled}
                                              value={"cancelled"}>Cancelled</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="card-body pt-0">
                    <Table borderless={true} className="mb-0">
                        <thead>
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Units</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Progress</th>
                        </tr>
                        </thead>
                        <tbody className="table-hover">
                        {this.props.orders.map((order) =>
                            <OrderRow
                                onClick={(order: Order) => this.props.onSelectOrder(order)}
                                order={order}
                                key={order.id}
                            />)
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}
