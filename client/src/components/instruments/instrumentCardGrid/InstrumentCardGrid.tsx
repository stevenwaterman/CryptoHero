import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import InstrumentCardContainer from "../instrumentCard/InstrumentCardContainer";
import {InstrumentCardGridProps} from "./InstrumentCardGridContainer";
import Instrument from "../../../models/Instrument";

function generateColumns({instrumentPrices, selectedInstrument}: InstrumentCardGridProps): Array<any> {
    return instrumentPrices.map(([instrument, price], index) => {
        const selected = instrument.name === selectedInstrument.name;
        return generateOneColumn(instrument, price, selected, index % 2 === 0);
    })
}

function generateOneColumn(instrument: Instrument, price: number, selected: boolean, isOnLeft: boolean): ELEMENT {
    const paddingLetter = isOnLeft ? "r" : "l";
    return (
        <div key={instrument.name} className={`col-md-6 p${paddingLetter}-md-0`}>
            <InstrumentCardContainer instrument={instrument} price={price} selected={selected}/>
        </div>
    )
}

export default class InstrumentCardGrid extends React.PureComponent<InstrumentCardGridProps> {
    render(): ELEMENT {
        return (
            <div className="row mt-3" id="instruments">
                {generateColumns(this.props)}
            </div>
        )
    }
}
