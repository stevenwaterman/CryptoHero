import React from 'react';
import './App.css';
import InstrumentCardGridContainer from "../instruments/instrumentCardGrid/InstrumentCardGridContainer";
import {ELEMENT} from "../../state/store/RootStore";
import TradeModalContainer from "../modals/tradeModal/TradeModalContainer";
import AvailableFundsContainer from "../funds/AvailableFundsContainer";
import NavBar from "../nav/NavBar";
import TotalFundsModalContainer from "../modals/funds/TotalFundsModalContainer";
import SelectedInstrument from "../selectedInstrument/SelectedInstrumentContainer";
import WithdrawModal from "../modals/withdrawModal/WithdrawModalContainer";
import DepositModal from "../modals/depositModal/DepositModalContainer";

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
                            <SelectedInstrument/>
                        </div>
                    </div>
                </div>
                <TradeModalContainer/>
                <TotalFundsModalContainer/>
                <WithdrawModal/>
                <DepositModal/>
            </div>
        )
    }
}
