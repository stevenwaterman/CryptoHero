import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import TradeBlotter from "./TradeBlotter";
import {ThunkDispatch} from "redux-thunk";
import Order from "../../models/Order";
import BlotterSetCategoryAction, {createBlotterSetCategoryAction} from "../../modules/components/blotter/BlotterSetCategoryAction";
import ShowViewOrderModalAction, {createShowViewOrderModalAction} from "../../modules/modals/viewOrder/ShowViewOrderModalAction";
import {fire, ThunkDsp} from "../../util/Thunker";

type Actions = BlotterSetCategoryAction | ShowViewOrderModalAction

interface DispatchProps {
    onSelectOrder: (order: Order) => void,
    onSetCategory: (newState: string) => void,
}

export interface StateProps {
    showState: string,
    orders: Array<Order>
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onSetCategory: fire(dispatch, createBlotterSetCategoryAction),
        onSelectOrder: fire(dispatch, createShowViewOrderModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const showState = state.blotter.showState;
    const selectedInstrument = state.instruments.selectedInstrument.name;
    const filtered = state.blotter.orders
        .filter((order: Order) =>
            order.instrument.name === selectedInstrument &&
            order.state === showState
        );
    return {
        showState: state.blotter.showState,
        orders: filtered
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeBlotter)
