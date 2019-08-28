import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import ViewTradeModal from "./ViewTradeModal";
import {ThunkDispatch} from "redux-thunk";
import HideViewTradeModalAction, {createHideViewTradeModalAction} from "../../../modules/modals/viewTrade/HideViewTradeModalAction";
import CancelOrderAction, {createCancelOrderAction} from "../../../modules/components/blotter/CancelOrderAction";
import Trade from "../../../models/Trade";
import {fireNP, ThunkDsp} from "../../../util/Thunker";

type Actions = CancelOrderAction | HideViewTradeModalAction

interface DispatchProps {
    onClickCancel: () => void,
    onHide: () => void
}

interface StateProps {
    show: boolean,
    trade: Trade
}

interface OwnProps {
}

export type ViewTradeModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onClickCancel: fireNP(dispatch, createCancelOrderAction),
        onHide: fireNP(dispatch, createHideViewTradeModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        show: state.modalVisibility.viewTradeVisible,
        trade: state.viewTradeModal.trade
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewTradeModal)