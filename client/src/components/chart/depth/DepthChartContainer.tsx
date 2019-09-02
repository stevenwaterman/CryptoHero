import {InstrumentOrderDepthData} from "../../../models/OrderDepthData";
import {State} from "../../../modules/RootStore";
import {connect} from "react-redux";
import DepthChart from "./DepthChart";

interface DispatchProps {
}

export interface StateProps {
    data: InstrumentOrderDepthData;
}

interface OwnProps {
}

export type DepthChartProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const orderDepth = state.chart.orderDepth;
    const instrument = state.instruments.selectedInstrument;
    let instrumentOrderDepthData = orderDepth.data.get(instrument.name);
    if(instrumentOrderDepthData == null){
        instrumentOrderDepthData = new InstrumentOrderDepthData([],[]);
    }
    return {
        data: instrumentOrderDepthData
    }
}

export default connect(
    mapStateToProps,
)(DepthChart)
