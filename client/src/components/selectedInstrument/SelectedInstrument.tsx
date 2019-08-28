import React from "react";
import {SelectedInstrumentProps} from "./SelectedInstrumentContainer";
import {ELEMENT} from "../../modules/RootStore";

export default class SelectedInstrument extends React.PureComponent<SelectedInstrumentProps> {
    render(): ELEMENT {
        return (
            <div className="text-center pb-2">
                <h4 className="display-4"><b>{this.props.selectedInstrument.name}</b></h4>
            </div>
        )
    }
}