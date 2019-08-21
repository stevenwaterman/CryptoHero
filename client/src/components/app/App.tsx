import React from 'react';
import './App.css';
import InstrumentCardGridContainer from "../../containers/instrumentCardGrid/InstrumentCardGridContainer";
import {ELEMENT} from "../../state/store";

export default class App extends React.Component {
    render(): ELEMENT {
        return (
            <div className="App">
                <InstrumentCardGridContainer/>
            </div>
        )
    }
}
