import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import InstrumentCardGrid from "./InstrumentCardGrid";
import {InstrumentActions} from "../../../state/store/InstrumentStore";
import {Dispatch} from "redux";
import Instrument from "../../../models/Instrument";

type Actions = InstrumentActions

interface DispatchProps {
}

export interface StateProps {
    instrumentPrices: Array<[Instrument, number]>,
    selectedInstrument: Instrument
}

interface OwnProps {
}

export type InstrumentCardGridProps = StateProps & DispatchProps & OwnProps

// noinspection JSUnusedLocalSymbols
function mapDispatchToProps(dispatch: Dispatch<Actions>, ownProps: OwnProps): DispatchProps {
    return {}
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        instrumentPrices: state.instruments.prices,
        selectedInstrument: state.instruments.selectedInstrument
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentCardGrid)
