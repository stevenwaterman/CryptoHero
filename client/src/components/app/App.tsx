import React from 'react';
import './App.css';
import InstrumentCardGridContainer from "../instruments/instrumentCardGrid/InstrumentCardGridContainer";
import {ELEMENT} from "../../modules/RootStore";
import TradeModalContainer from "../modals/tradeModal/TradeModalContainer";
import AvailableFundsContainer from "../funds/AvailableFundsContainer";
import TotalFundsModalContainer from "../modals/funds/TotalFundsModalContainer";
import SelectedInstrumentContainer from "../selectedInstrument/SelectedInstrumentContainer";
import WithdrawModalContainer from "../modals/withdrawModal/WithdrawModalContainer";
import DepositModalContainer from "../modals/depositModal/DepositModalContainer";
import ChartCardContainer from "../chart/ChartCardContainer";
import TradeBlotterContainer from "../tradeBlotter/TradeBlotterContainer";
import ViewTradeModalContainer from "../modals/viewOrder/ViewOrderModalContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/es/Col";
import TopBarContainer from "../nav/TopBarContainer";
import {AppProps} from "./AppContainer";
import SocketReceiverContainer from "../socketReceiver/SocketManagerContainer";
import LoadingPlaceholderContainer from "../loadingPlaceholder/LoadingPlaceholderContainer";

export default class App extends React.Component<AppProps> {
    componentDidMount(): void {
        this.props.createAccount();
    }

    render(): ELEMENT {
        return (
            <>
                <div className="fitScreen">
                    <TopBarContainer/>
                    <Container fluid={true} hidden={this.props.loading}>
                        <Row className="row-eq-height">
                            <Col sm="4">
                                <AvailableFundsContainer/>
                                <InstrumentCardGridContainer/>
                            </Col>
                            <Col sm="8" className="my-3 my-sm-0">
                                <SelectedInstrumentContainer/>
                                <ChartCardContainer/>
                                <TradeBlotterContainer/>
                            </Col>
                        </Row>
                    </Container>
                    <LoadingPlaceholderContainer/>
                    <TradeModalContainer/>
                    <TotalFundsModalContainer/>
                    <WithdrawModalContainer/>
                    <DepositModalContainer/>
                    <ViewTradeModalContainer/>

                    <SocketReceiverContainer/>
                </div>
            </>
        )
    }
}
