import React from 'react';
import './App.css';
import InstrumentCardGridContainer from "../instruments/instrumentCardGrid/InstrumentCardGridContainer";
import {ELEMENT} from "../../state/store/RootStore";
import TradeModalContainer from "../modals/trade/TradeModalContainer";

export default class App extends React.Component {
    render(): ELEMENT {
        return (
            <div className="App">
                <InstrumentCardGridContainer/>
                <TradeModalContainer/>
            </div>
        )
    }
}
