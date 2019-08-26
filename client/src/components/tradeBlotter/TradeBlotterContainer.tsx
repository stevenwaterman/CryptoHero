import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import TradeBlotter from "./TradeBlotter";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction
    from "../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";
import TradeSimple from "../../models/TradeSimple";
import {BlotterShowCompletedAction} from "../../state/reducers/blotter/IBlotterShowCompletedAction";
import {BlotterShowPendingAction} from "../../state/reducers/blotter/IBlotterShowPendingAction";
import {StartViewTradeAction} from "../../state/reducers/modal/viewTrade/IStartViewTradeAction";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onSelectTrade: (id: string) => void,
    onSelectPending: () => void,
    onSelectCompleted: () => void,
}

export interface StateProps {
    trades: Array<TradeSimple>
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onSelectCompleted: () => (BlotterShowCompletedAction.fire()),
        onSelectPending: () => dispatch(BlotterShowPendingAction.fire()),
        onSelectTrade: (id: string) => dispatch(StartViewTradeAction.fire(id))
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const showCompleted = state.blotter.showCompleted;
    const relevant = showCompleted ? state.blotter.completed : state.blotter.pending;
    const selectedInstrument = state.instruments.selectedInstrument;
    const filtered = relevant.filter((trade: TradeSimple) => trade.instrument.name === selectedInstrument.name);
    return {
        trades: filtered
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeBlotter)
