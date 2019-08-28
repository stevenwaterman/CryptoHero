import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import TradeBlotter from "./TradeBlotter";
import {ThunkDispatch} from "redux-thunk";
import Order from "../../models/Order";
import BlotterSetCategoryAction, {createBlotterSetCategoryAction} from "../../modules/components/blotter/BlotterSetCategoryAction";
import ShowViewTradeModalAction, {createShowViewTradeModalAction} from "../../modules/modals/viewTrade/ShowViewTradeModalAction";
import {fire, ThunkDsp} from "../../util/Thunker";

type Actions = BlotterSetCategoryAction | ShowViewTradeModalAction

interface DispatchProps {
    onSelectTrade: (id: string) => void,
    onSetCategory: (selectPending: boolean) => void,
}

export interface StateProps {
    pendingSelected: boolean
    trades: Array<Order>
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onSetCategory: fire(dispatch, createBlotterSetCategoryAction),
        onSelectTrade: fire(dispatch, createShowViewTradeModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const showPending = state.blotter.showPending;
    const relevant = showPending ? state.blotter.pending : state.blotter.completed;
    const selectedInstrument = state.instruments.selectedInstrument;
    const filtered = relevant.filter((trade: Order) => trade.instrument.name === selectedInstrument.name);
    return {
        pendingSelected: state.blotter.showPending,
        trades: filtered
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeBlotter)
