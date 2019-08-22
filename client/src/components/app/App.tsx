import React from 'react';
import './App.css';
import InstrumentCardGridContainer from "../instruments/instrumentCardGrid/InstrumentCardGridContainer";
import {ELEMENT} from "../../state/store/RootStore";

export default class App extends React.Component {
    render(): ELEMENT {
        return (
            <div className="App">
                <InstrumentCardGridContainer/>
            </div>
        )
    }
}