import {connect} from "react-redux";
import SocketReceiver from "./SocketReceiver";
import Instrument from "../../models/Instrument";
import {State} from "../../modules/RootStore";
import {ThunkDsp} from "../../util/Thunker";
import SetInstrumentPriceAction, {createSetInstrumentPriceAction} from "../../modules/components/instruments/SetInstrumentPriceAction";
import OrderDepthDeltaAction, {createOrderDepthDeltaAction} from "../../modules/components/chart/OrderDepthDeltaAction";
import {IOrderDepth, OrderDepth} from "../../models/OrderDepth";

type Actions = SetInstrumentPriceAction | OrderDepthDeltaAction;

interface DispatchProps {
    setInstrumentPrice: (instrument: Instrument, newPrice: number, time: number) => void,
    orderDepthDelta: (instrument: Instrument, delta: IOrderDepth) => void,
}

interface StateProps {
}

interface OwnProps {
}

export type SocketReceiverProps = DispatchProps & StateProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        setInstrumentPrice: (instrument, newPrice, time) => dispatch(createSetInstrumentPriceAction(instrument, newPrice, time)),
        orderDepthDelta: (instrument, delta) => dispatch(createOrderDepthDeltaAction(instrument, delta))
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocketReceiver)
