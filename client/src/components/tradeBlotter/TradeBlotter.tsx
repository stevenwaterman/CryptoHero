import React from "react";
import {ChartCardProps} from "./TradeBlotterContainer";
import {ELEMENT} from "../../modules/RootStore";
import OrderRow from "./row/OrderRow";
import {Card, Col, Pagination, Row, Table, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import Order from "../../models/Order";
import {clamp} from "../../util/Clamp";
import "./TradeBlotter.css"

export default class TradeBlotter extends React.Component<ChartCardProps> {
    render(): ELEMENT {
        return (
            <Card className="mt-3" id="trades">
                <Card.Header>
                    <Row className="justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <Card.Title className="text-center my-0"><b>Orders</b></Card.Title>
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
                    <Pagination className="mt-4 mb-0 justify-content-center">
                        <Pagination.First onClick={() => this.props.onSetPage(clamp(this.props.currentPage - 5, 0, this.props.lastPage))} disabled={this.props.currentPage < 6}/>
                        <Pagination.Prev onClick={() => this.props.onSetPage(clamp(this.props.currentPage - 1, 0, this.props.lastPage))} disabled={this.props.currentPage < 2}/>
                        <Pagination.Item className="hiddenIfSmall" onClick={() => this.props.onSetPage(1)} >{1}</Pagination.Item>
                        <Pagination.Ellipsis className="hiddenIfSmall" disabled />

                        <Pagination.Item className="hiddenIfSmall" onClick={() => this.props.onSetPage(clamp(this.props.currentPage - 2, 0, this.props.lastPage))} disabled={this.props.currentPage < 3}>{this.props.currentPage - 2}</Pagination.Item>
                        <Pagination.Item className="hiddenIfSmall" onClick={() => this.props.onSetPage(clamp(this.props.currentPage - 1, 0, this.props.lastPage))} disabled={this.props.currentPage < 2}>{this.props.currentPage - 1}</Pagination.Item>
                        <Pagination.Item active>{this.props.currentPage}</Pagination.Item>
                        <Pagination.Item className="hiddenIfSmall" onClick={() => this.props.onSetPage(clamp(this.props.currentPage + 1, 0, this.props.lastPage))} disabled={this.props.currentPage + 1 > this.props.lastPage}>{this.props.currentPage + 1}</Pagination.Item>
                        <Pagination.Item className="hiddenIfSmall" onClick={() => this.props.onSetPage(clamp(this.props.currentPage + 2, 0, this.props.lastPage))} disabled={this.props.currentPage + 2 > this.props.lastPage}>{this.props.currentPage + 2}</Pagination.Item>

                        <Pagination.Ellipsis className="hiddenIfSmall" disabled />
                        <Pagination.Item className="hiddenIfSmall" onClick={() => this.props.onSetPage(this.props.lastPage)}>{this.props.lastPage}</Pagination.Item>
                        <Pagination.Next onClick={() => this.props.onSetPage(clamp(this.props.currentPage + 1, 0, this.props.lastPage))} disabled={this.props.currentPage === this.props.lastPage}/>
                        <Pagination.Last onClick={() => this.props.onSetPage(clamp(this.props.currentPage + 5, 0, this.props.lastPage))} disabled={this.props.currentPage + 5 > this.props.lastPage}/>
                    </Pagination>
                </Card.Body>
            </Card>
        )
    }
}
