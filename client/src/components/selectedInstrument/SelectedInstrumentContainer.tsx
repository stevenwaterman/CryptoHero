import {connect} from "react-redux";
import SelectedInstrument from "./SelectedInstrument";
import Instrument from "../../models/Instrument";
import {State} from "../../modules/RootStore";

interface DispatchProps {
}

interface StateProps {
    selectedInstrument: Instrument
}

interface OwnProps {
}

export type SelectedInstrumentProps = DispatchProps & StateProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        selectedInstrument: state.instruments.selectedInstrument
    }
}

export default connect(
    mapStateToProps
)(SelectedInstrument)
