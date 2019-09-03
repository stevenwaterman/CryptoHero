import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import InstrumentCardGrid from "./InstrumentCardGrid";
import Instrument from "../../../models/Instrument";

interface DispatchProps {
}

export interface StateProps {
    instruments: Array<Instrument>,
}

interface OwnProps {
}

export type InstrumentCardGridProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        instruments: state.instruments.instrumentList
    }
}

export default connect(
    mapStateToProps,
)(InstrumentCardGrid)
