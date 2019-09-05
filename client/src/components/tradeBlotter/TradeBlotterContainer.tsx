import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import TradeBlotter from "./TradeBlotter";
import Order from "../../models/Order";
import BlotterSetCategoryAction, {createBlotterSetCategoryAction} from "../../modules/components/blotter/BlotterSetCategoryAction";
import ShowViewOrderModalAction, {createShowViewOrderModalAction} from "../../modules/modals/viewOrder/ShowViewOrderModalAction";
import {fire, ThunkDsp} from "../../util/Thunker";
import {clamp} from "../../util/Clamp";
import SetBlotterPageAction, {createSetBlotterPageAction} from "../../modules/components/blotter/SetBlotterPageAction";

type Actions = BlotterSetCategoryAction | ShowViewOrderModalAction | SetBlotterPageAction

interface DispatchProps {
    onSelectOrder: (order: Order) => void,
    onSetCategory: (newState: string) => void,
    onSetPage: (newPage: number) => void,
}

export interface StateProps {
    showState: string,
    orders: Array<Order>
    canSelectPending: boolean,
    canSelectComplete: boolean,
    canSelectCancelled: boolean,
    currentPage: number,
    lastPage: number,
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onSetCategory: fire(dispatch, createBlotterSetCategoryAction),
        onSelectOrder: fire(dispatch, createShowViewOrderModalAction),
        onSetPage: newPage => dispatch(createSetBlotterPageAction(newPage))
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const showState = state.blotter.showState;
    const selectedInstrument = state.instruments.selectedInstrument.name;
    const correctInstrument = state.blotter.orders
        .filter((order: Order) =>
            order.instrument.name === selectedInstrument
        );
    const correctState = correctInstrument.filter(it => it.state === showState);

    const canSelectCancelled = correctInstrument.find(it => it.state === "cancelled") != null;
    const canSelectPending = correctInstrument.find(it => it.state === "pending") != null;
    const canSelectComplete = correctInstrument.find(it => it.state === "complete") != null;

    const lastPage = clamp(Math.ceil((correctState.length) / 10), 1);
    let currentPage: number = clamp(state.blotter.currentPage, 0, lastPage);

    const perPage = 10;
    const offset = (currentPage - 1) * perPage;
    const ordersOnPage = correctState.slice(offset, offset + perPage);

    return {
        showState: state.blotter.showState,
        orders: ordersOnPage,
        canSelectCancelled: canSelectCancelled,
        canSelectComplete: canSelectComplete,
        canSelectPending: canSelectPending,
        currentPage: currentPage,
        lastPage: lastPage,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeBlotter)
