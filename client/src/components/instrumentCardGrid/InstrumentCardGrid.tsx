import React from "react";
import InstrumentCard from "../instrumentCard/InstrumentCard";
import {ELEMENT} from "../../state/store";

export interface InstrumentCardGridProps {
    instrumentPrices: Array<[string, string]>,
    selectedInstrument: string
}

function generateColumns({instrumentPrices, selectedInstrument}: InstrumentCardGridProps): Array<any> {
    return instrumentPrices.map(([instrument, price], index) => {
        const selected = instrument === selectedInstrument;
        const left = index % 2 === 0;
        return generateOneColumn(instrument, price, selected, left);
    })
}

function generateOneColumn(instrument: string, price: string, selected: boolean, left: boolean): any {
    return (
        <div className="col-md-6 pr-md-0">
            <InstrumentCard instrument={instrument} price={price} selected={selected}/>
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
