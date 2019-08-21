import {connect} from "react-redux";
import {AppState} from "../../state/store";
import InstrumentCardGrid, {InstrumentCardGridProps} from "../../components/instrumentCardGrid/InstrumentCardGrid";

function mapStateToProps(state: AppState): InstrumentCardGridProps {
    return {
        instrumentPrices: state.instruments.prices,
        selectedInstrument: state.instruments.selectedInstrument
    }
}

export default connect(
    mapStateToProps
)(InstrumentCardGrid)