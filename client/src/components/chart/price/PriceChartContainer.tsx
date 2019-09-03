import {InstrumentOrderDepthData} from "../../../models/OrderDepthData";
import {State} from "../../../modules/RootStore";
import {connect} from "react-redux";
import PriceChart from "./PriceChart";
import {InstrumentPriceHistory, PriceHistory} from "../../../models/PriceHistory";
import Instrument from "../../../models/Instrument";

interface DispatchProps {
}

export interface StateProps {
    priceHistory: InstrumentPriceHistory;
    hide: boolean;
}

interface OwnProps {
}

export type PriceChartProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const priceHistory: PriceHistory = state.chart.priceHistory;
    const instrument: Instrument = state.instruments.selectedInstrument;
    let instrumentData = priceHistory.get(instrument.name);
    if(instrumentData == null){
        instrumentData = new InstrumentPriceHistory([]);
    }
    return {
        priceHistory: instrumentData,
        hide: !state.chart.showHistorical
    }
}

export default connect(
    mapStateToProps,
)(PriceChart)
