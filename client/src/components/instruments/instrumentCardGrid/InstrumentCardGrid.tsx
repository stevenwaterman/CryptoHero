import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import InstrumentCardContainer from "../instrumentCard/InstrumentCardContainer";
import {InstrumentCardGridProps} from "./InstrumentCardGridContainer";
import Instrument from "../../../models/Instrument";
import {Col, Row} from "react-bootstrap";

function generateColumns({instrumentPrices, selectedInstrument}: InstrumentCardGridProps): Array<any> {
    const entries: Array<any> = [];
    let i = 0;
    instrumentPrices.forEach((price: number, instrument: Instrument) => {
        const selected = instrument.name === selectedInstrument.name;
        entries.push( generateOneColumn(instrument, price, selected, i % 2 === 0));
        i++;
    });
    return entries;
}

function generateOneColumn(instrument: Instrument, price: number, selected: boolean, isOnLeft: boolean): ELEMENT {
    const zeroPaddingSide = isOnLeft ? "r" : "l";
    return (
        <Col md="6" key={instrument.name} className={`p${zeroPaddingSide}-md-0`}>
            <InstrumentCardContainer instrument={instrument} price={price} selected={selected}/>
        </Col>
    )
}

export default class InstrumentCardGrid extends React.PureComponent<InstrumentCardGridProps> {
    render(): ELEMENT {
        return (
            <Row className="mt-3">{generateColumns(this.props)}</Row>
        )
    }
}
