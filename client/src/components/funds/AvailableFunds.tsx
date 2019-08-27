import React from "react";
import {formatMoney} from "../../util/FormatMoney";
import {AvailableFundsProps} from "./AvailableFundsContainer";
import {ELEMENT} from "../../state/store/RootStore";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function generateColumns(funds: Array<[string, number]>): Array<any> {
    return funds.map(generateOneColumn);
}

function generateOneColumn([asset, price]: [string, number]): ELEMENT {
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

export default class AvailableFunds extends React.PureComponent<AvailableFundsProps> {
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
                        <Button variant="primary" block={true} className="pr-sm-1" onClick={this.props.onClickWithdraw}>
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
