import React from "react";
import {SelectedInstrumentProps} from "./SelectedInstrumentContainer";
import {ELEMENT} from "../../modules/RootStore";
import "./SelectedInstrument.css"

export default class SelectedInstrument extends React.Component<SelectedInstrumentProps> {
    render(): ELEMENT {
        return (
            <div className="text-center pb-1">
                <h4 className="display-4 selected-instrument">{this.props.selectedInstrument.name}</h4>
            </div>
        )
    }
}