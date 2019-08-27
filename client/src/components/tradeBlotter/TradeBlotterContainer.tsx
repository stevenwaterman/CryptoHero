import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import TradeBlotter from "./TradeBlotter";
import {ThunkDispatch} from "redux-thunk";
import Trade from "../../models/Trade";
import BlotterSetCategoryAction, {createBlotterSetCategoryAction} from "../../state/reducers/blotter/BlotterSetCategoryAction";
import ShowViewTradeModalAction, {createShowViewTradeModalAction} from "../../state/reducers/modal/viewTrade/ShowViewTradeModalAction";
import {fire} from "../../util/StatefulActionCreator";

type Actions = BlotterSetCategoryAction | ShowViewTradeModalAction

interface DispatchProps {
    onSelectTrade: (id: string) => void,
    onSetCategory: (selectPending: boolean) => void,
}

export interface StateProps {
    pendingSelected: boolean
    trades: Array<Trade>
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onSetCategory: fire(dispatch, createBlotterSetCategoryAction),
        onSelectTrade: fire(dispatch, createShowViewTradeModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const showPending = state.blotter.showPending;
    const relevant = showPending ? state.blotter.pending : state.blotter.completed;
    const selectedInstrument = state.instruments.selectedInstrument;
    const filtered = relevant.filter((trade: Trade) => trade.instrument.name === selectedInstrument.name);
    return {
        pendingSelected: state.blotter.showPending,
        trades: filtered
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeBlotter)
