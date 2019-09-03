import {InstrumentOrderDepthData} from "../../../models/OrderDepthData";
import {State} from "../../../modules/RootStore";
import {connect} from "react-redux";
import DepthChart from "./DepthChart";

interface DispatchProps {
}

export interface StateProps {
    depthData: InstrumentOrderDepthData;
    hide: boolean;
}

interface OwnProps {
}

export type DepthChartProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const orderDepth = state.chart.orderDepth;
    const instrument = state.instruments.selectedInstrument;
    let instrumentOrderDepthData = orderDepth.get(instrument.name);
    if(instrumentOrderDepthData == null){
        instrumentOrderDepthData = new InstrumentOrderDepthData([],[]);
    }
    return {
        depthData: instrumentOrderDepthData,
        hide: state.chart.showHistorical
    }
}

export default connect(
    mapStateToProps,
)(DepthChart)
