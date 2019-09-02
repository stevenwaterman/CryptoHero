import React from "react";
import {ELEMENT} from "../../../modules/RootStore";
import InstrumentCardContainer from "../instrumentCard/InstrumentCardContainer";
import {InstrumentCardGridProps} from "./InstrumentCardGridContainer";
import Instrument from "../../../models/Instrument";
import {Col, Row} from "react-bootstrap";

function generateColumns({instruments}: InstrumentCardGridProps): Array<any> {
    return instruments.map((it, index) => generateOneColumn(it, index % 2 === 0))
}

function generateOneColumn(instrument: Instrument, isOnLeft: boolean): ELEMENT {
    const zeroPaddingSide = isOnLeft ? "r" : "l";
    return (
        <Col md="6" key={instrument.name} className={`p${zeroPaddingSide}-md-0`}>
            <InstrumentCardContainer instrument={instrument}/>
        </Col>
    )
}

export default class InstrumentCardGrid extends React.Component<InstrumentCardGridProps> {
    render(): ELEMENT {
        return (
            <Row className="mt-3">{generateColumns(this.props)}</Row>
        )
    }
}
