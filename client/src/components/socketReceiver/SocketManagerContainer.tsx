import {connect} from "react-redux";
import SocketManager from "./SocketManager";
import Instrument from "../../models/Instrument";
import {State} from "../../modules/RootStore";
import {ThunkDsp} from "../../util/Thunker";
import SetInstrumentPriceAction, {createSetInstrumentPriceAction} from "../../modules/components/instruments/SetInstrumentPriceAction";
import OrderDepthDeltaAction, {createOrderDepthDeltaAction} from "../../modules/components/chart/OrderDepthDeltaAction";
import {IOrderDepth} from "../../models/OrderDepth";
import SetAccountListenerIdAction, {createSetAccountListenerIdAction} from "../../modules/global/SetAccountListenerIdAction";
import SetAssetFundsAction, {createSetAssetFundsAction} from "../../modules/components/availableFunds/SetAssetFundsAction";
import Order from "../../models/Order";
import UpdateOrderAction, {createUpdateOrderAction} from "../../modules/components/blotter/updateOrderAction";
import Big from "big.js";

type Actions =
    SetInstrumentPriceAction
    | OrderDepthDeltaAction
    | SetAccountListenerIdAction
    | SetAssetFundsAction
    | UpdateOrderAction;

interface DispatchProps {
    setInstrumentPrice: (instrument: Instrument, newPrice: Big, time: number) => void,
    orderDepthDelta: (instrument: Instrument, delta: IOrderDepth) => void,
    setAccountListenerId: (accountListenerId: [string, string, string]) => void,
    setAssetFunds: (asset: string, newAmount: Big) => void,
    updateOrder: (order: Order) => void,
}

interface StateProps {
}

interface OwnProps {
}

export type SocketReceiverProps = DispatchProps & StateProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        setInstrumentPrice: (instrument, newPrice, time) => dispatch(createSetInstrumentPriceAction(instrument, newPrice, time)),
        orderDepthDelta: (instrument, delta) => dispatch(createOrderDepthDeltaAction(instrument, delta)),
        setAccountListenerId: (id) => dispatch(createSetAccountListenerIdAction(id)),
        setAssetFunds: (asset, newFunds) => dispatch(createSetAssetFundsAction(asset, newFunds)),
        updateOrder: (order) => dispatch(createUpdateOrderAction(order)),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocketManager)
