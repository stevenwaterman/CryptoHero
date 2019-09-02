import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import ViewOrderModal from "./ViewOrderModal";
import {ThunkDispatch} from "redux-thunk";
import HideViewOrderModalAction, {createHideViewTradeModalAction} from "../../../modules/modals/viewOrder/HideViewOrderModalAction";
import CancelOrderAction, {createCancelOrderAction} from "../../../modules/components/blotter/CancelOrderAction";
import Order from "../../../models/Order";
import {fireNP, ThunkDsp} from "../../../util/Thunker";

type Actions = CancelOrderAction | HideViewOrderModalAction

interface DispatchProps {
    onClickCancel: () => void,
    onHide: () => void
}

interface StateProps {
    show: boolean,
    trade: Order
}

interface OwnProps {
}

export type ViewTradeModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onClickCancel: async () => await dispatch(createCancelOrderAction()),
        onHide: fireNP(dispatch, createHideViewTradeModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        show: state.modalVisibility.viewTradeVisible,
        trade: state.viewOrderModal.order
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewOrderModal)