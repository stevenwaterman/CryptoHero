import React from "react";
import {ChartCardProps} from "./ChartCardContainer";
import {ELEMENT} from "../../state/store/RootStore";
import {Card, Col, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

export default class ChartCard extends React.PureComponent<ChartCardProps> {
    render(): ELEMENT {
        return (
            <Card>
                <Card.Header>
                    <Row className="justify-content-center">
                        <Col xs="auto" className="my-auto">
                            <Card.Title className="text-center my-0"><b>Graphs</b></Card.Title>
                        </Col>
                        <Col xs="auto">
                            <ToggleButtonGroup name="chartType" type="radio" value={this.props.chartType}
                                               onChange={this.props.onChartTypeChange}>
                                <ToggleButton value={"Historical"}>Historical</ToggleButton>
                                <ToggleButton value={"Current"}>Current</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <img alt="order depth chart" className="img-fluid" src="https://i.imgur.com/mu8gmwt.png"/>
                </Card.Body>
            </Card>
        )
    }
}
