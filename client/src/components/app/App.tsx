import React from 'react';
import './App.css';
import InstrumentCardGridContainer from "../instruments/instrumentCardGrid/InstrumentCardGridContainer";
import {ELEMENT} from "../../state/store/RootStore";
import TradeModalContainer from "../modals/tradeModal/TradeModalContainer";
import AvailableFundsContainer from "../funds/AvailableFundsContainer";
import NavBar from "../nav/NavBar";
import TotalFundsModalContainer from "../modals/funds/TotalFundsModalContainer";
import SelectedInstrumentContainer from "../selectedInstrument/SelectedInstrumentContainer";
import WithdrawModalContainer from "../modals/withdrawModal/WithdrawModalContainer";
import DepositModalContainer from "../modals/depositModal/DepositModalContainer";
import ChartCardContainer from "../chart/ChartCardContainer";
import TradeBlotterContainer from "../tradeBlotter/TradeBlotterContainer";
import ViewTradeModalContainer from "../modals/viewTrade/ViewTradeModalContainer";

export default class App extends React.Component {
    render(): ELEMENT {
        return (
            <div>
                <NavBar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4">
                            <AvailableFundsContainer/>
                            <InstrumentCardGridContainer/>
                        </div>
                        <div className="col-sm-8 my-3 my-sm-0" id="right bar">
                            <SelectedInstrumentContainer/>
                            <ChartCardContainer/>
                            <TradeBlotterContainer/>
                        </div>
                    </div>
                </div>
                <TradeModalContainer/>
                <TotalFundsModalContainer/>
                <WithdrawModalContainer/>
                <DepositModalContainer/>
                <ViewTradeModalContainer/>
            </div>
        )
    }
}
