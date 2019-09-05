import {State} from "../../../modules/RootStore";
import {connect} from "react-redux";
import PriceChart from "./PriceChart";
import Instrument from "../../../models/Instrument";
import {IPriceHistory, PriceHistory} from "../../../models/PriceHistory";

interface DispatchProps {
}

export interface StateProps {
    priceHistory: IPriceHistory;
    hide: boolean;
}

interface OwnProps {
}

export type PriceChartProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const priceHistory: PriceHistory = state.chart.priceHistory;
    const instrument: Instrument = state.instruments.selectedInstrument;
    let instrumentData = priceHistory.get(instrument.name);
    if (instrumentData == null) {
        instrumentData = [];
    }
    return {
        priceHistory: instrumentData,
        hide: !state.chart.showHistorical
    }
}

export default connect(
    mapStateToProps,
)(PriceChart)
