import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import InstrumentCardContainer from "../instrumentCard/InstrumentCardContainer";
import {InstrumentCardGridProps} from "./InstrumentCardGridContainer";
import Instrument from "../../../models/Instrument";
import {Col, Row} from "react-bootstrap";

function generateColumns({instrumentPrices, selectedInstrument}: InstrumentCardGridProps): Array<any> {
    return instrumentPrices.map(([instrument, price], index) => {
        const selected = instrument.name === selectedInstrument.name;
        return generateOneColumn(instrument, price, selected, index % 2 === 0);
    })
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
