import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import TradeBlotter from "./TradeBlotter";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction
    from "../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";
import TradeSimple from "../../models/TradeSimple";
import {BlotterSetCategoryAction} from "../../state/reducers/blotter/IBlotterSetCategoryAction";
import {ShowViewTradeModal} from "../../state/reducers/modal/viewTrade/IShowViewTradeModalAction";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onSelectTrade: (id: string) => void,
    onSelectPending: () => void,
    onSelectCompleted: () => void,
}

export interface StateProps {
    pendingSelected: boolean
    trades: Array<TradeSimple>
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onSelectCompleted: () => (BlotterSetCategoryAction.fire(false)),
        onSelectPending: () => dispatch(BlotterSetCategoryAction.fire(true)),
        onSelectTrade: (id: string) => dispatch(ShowViewTradeModal.fire(id))
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const showPending = state.blotter.showPending;
    const relevant = showPending ? state.blotter.pending : state.blotter.completed;
    const selectedInstrument = state.instruments.selectedInstrument;
    const filtered = relevant.filter((trade: TradeSimple) => trade.instrument.name === selectedInstrument.name);
    return {
        pendingSelected: state.blotter.showPending,
        trades: filtered
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeBlotter)
