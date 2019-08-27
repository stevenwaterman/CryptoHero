import React from "react";
import {ChartCardProps} from "./TradeBlotterContainer";
import {ELEMENT} from "../../state/store/RootStore";
import TradeRow from "./row/TradeRow";
import {Card, Col, Row, Table, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

export default class TradeBlotter extends React.PureComponent<ChartCardProps> {
    render(): ELEMENT {
        return (
            <Card className="mt-3" id="trades">
                <Card.Header>
                    <Row className="justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <Card.Title className="text-center my-0"><b>Trades</b></Card.Title>
                        </Col>
                        <Col xs="auto">
                            <ToggleButtonGroup name="tradeType" type="radio" value={this.props.pendingSelected}
                                               onChange={this.props.onSetCategory}>
                                <ToggleButton value={false}>Pending</ToggleButton>
                                <ToggleButton value={true}>Completed</ToggleButton>
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
                        </tr>
                        </thead>
                        <tbody className="table-hover">
                        {this.props.trades.map((trade) =>
                            <TradeRow
                                onClick={(id: string) => this.props.onSelectTrade(id)}
                                trade={trade}
                                key={trade.id}
                            />)
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}
