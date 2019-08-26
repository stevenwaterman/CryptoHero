import React from 'react';
import './App.css';
import InstrumentCardGridContainer from "../instruments/instrumentCardGrid/InstrumentCardGridContainer";
import {ELEMENT} from "../../state/store/RootStore";
import TradeModalContainer from "../modals/tradeModal/TradeModalContainer";
import AvailableFundsContainer from "../funds/AvailableFundsContainer";
import TopBar from "../nav/TopBar";
import TotalFundsModalContainer from "../modals/funds/TotalFundsModalContainer";
import SelectedInstrumentContainer from "../selectedInstrument/SelectedInstrumentContainer";
import WithdrawModalContainer from "../modals/withdrawModal/WithdrawModalContainer";
import DepositModalContainer from "../modals/depositModal/DepositModalContainer";
import ChartCardContainer from "../chart/ChartCardContainer";
import TradeBlotterContainer from "../tradeBlotter/TradeBlotterContainer";
import ViewTradeModalContainer from "../modals/viewTrade/ViewTradeModalContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/es/Col";

export default class App extends React.Component {
    render(): ELEMENT {
        return (
            <>
                <TopBar/>
                <Container fluid={true}>
                    <Row>
                        <Col sm="4">
                            <AvailableFundsContainer/>
                            <InstrumentCardGridContainer/>
                        </Col>
                        <Col sm="8" className="col-sm-8 my-3 my-sm-0">
                            <SelectedInstrumentContainer/>
                            <ChartCardContainer/>
                            <TradeBlotterContainer/>
                        </Col>
                    </Row>
                </Container>
                <TradeModalContainer/>
                <TotalFundsModalContainer/>
                <WithdrawModalContainer/>
                <DepositModalContainer/>
                <ViewTradeModalContainer/>
            </>
        )
    }
}
