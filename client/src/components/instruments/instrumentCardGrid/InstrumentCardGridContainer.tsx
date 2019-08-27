import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import InstrumentCardGrid from "./InstrumentCardGrid";
import Instrument from "../../../models/Instrument";

interface DispatchProps {
}

export interface StateProps {
    instrumentPrices: Map<Instrument, number>,
    selectedInstrument: Instrument
}

interface OwnProps {
}

export type InstrumentCardGridProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        instrumentPrices: state.instruments.prices,
        selectedInstrument: state.instruments.selectedInstrument
    }
}

export default connect(
    mapStateToProps,
)(InstrumentCardGrid)
