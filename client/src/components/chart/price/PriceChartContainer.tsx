import {InstrumentOrderDepthData} from "../../../models/OrderDepthData";
import {State} from "../../../modules/RootStore";
import {connect} from "react-redux";
import PriceChart from "./PriceChart";
import HistoricalPriceData, {InstrumentHistoricalPriceData} from "../../../models/HistoricalPriceData";

interface DispatchProps {
}

export interface StateProps {
    historicalData: InstrumentHistoricalPriceData;
    hide: boolean;
}

interface OwnProps {
}

export type PriceChartProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const historicalPriceData = state.chart.historicalPrices;
    const instrument = state.instruments.selectedInstrument;
    let instrumentData = historicalPriceData.data.get(instrument.name);
    if(instrumentData == null){
        instrumentData = new InstrumentHistoricalPriceData([]);
    }
    return {
        historicalData: instrumentData,
        hide: !state.chart.showHistorical
    }
}

export default connect(
    mapStateToProps,
)(PriceChart)
