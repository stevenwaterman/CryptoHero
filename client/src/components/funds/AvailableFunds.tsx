import React from "react";
import {formatMoney} from "../../util/FormatMoney";
import {AvailableFundsProps} from "./AvailableFundsContainer";
import {ELEMENT} from "../../modules/RootStore";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function generateColumns(funds: Map<string, number>): Array<any> {
    const columns: Array<any> = [];
    funds.forEach((price: number, asset: string) => columns.push(generateOneColumn(asset, price)));
    return columns
}

function generateOneColumn(asset: string, price: number): ELEMENT {
    return (
        <Col lg="6" key={asset}>
            <OverlayTrigger
                key={asset}
                placement="right"
                overlay={
                    <Tooltip id={`${asset} Available tooltip`}>
                        {formatMoney(price, 5, true, false)}
                    </Tooltip>
                }>
                <Row>
                    <Col className="pr-1">
                        <b>{asset}:</b>
                    </Col>
                    <Col className="pl-1 text-right">
                        {formatMoney(price, 2, true, false)}
                    </Col>
                </Row>
            </OverlayTrigger>
        </Col>
    )
}

export default class AvailableFunds extends React.Component<AvailableFundsProps> {
    render(): ELEMENT {
        return (
            <Card>
                <Card.Header className="my-auto">
                    <Card.Title className="text-center my-0"><b>Available Funds</b></Card.Title>
                </Card.Header>
                <Row className="py-2 px-2">
                    {generateColumns(this.props.availableFunds)}
                </Row>
                <Button variant="primary" onClick={() => this.props.onClickTotalFunds()}>Total Funds</Button>
                <Row className="pt-2">
                    <Col sm={true}>
                        <Button disabled={!this.props.canWithdraw} variant="primary" block={true} className="pr-sm-1"
                                onClick={this.props.onClickWithdraw}>
                            Withdraw
                        </Button>
                    </Col>
                    <Col sm={true}>
                        <Button variant="primary" block={true} className="pl-sm-1" onClick={this.props.onClickDeposit}>
                            Deposit
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}
