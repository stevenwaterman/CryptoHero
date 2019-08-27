import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import ViewTradeModal from "./ViewTradeModal";
import {ThunkDispatch} from "redux-thunk";
import HideViewTradeModalAction, {createHideViewTradeModalAction} from "../../../state/reducers/modal/viewTrade/HideViewTradeModalAction";
import CancelOrderAction, {createCancelOrderAction} from "../../../state/reducers/blotter/CancelOrderAction";
import Trade from "../../../models/Trade";
import {fireNP} from "../../../util/Thunker";

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

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
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