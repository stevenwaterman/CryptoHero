import {connect} from "react-redux";
import {Store} from "redux"
import {State} from "../../../state/store/RootStore";
import ConfirmTradeAction from "../../../state/reducers/modal/trade/ConfirmTradeAction";
import WithdrawModal from "./WithdrawModal";
import {ThunkDispatch} from "redux-thunk";
import HideWithdrawModalAction, {createHideWithdrawModalAction,} from "../../../state/reducers/modal/withdraw/HideWithdrawModalAction";
import {createConfirmWithdrawAction} from "../../../state/reducers/funds/ConfirmWithdrawAction";
import {fireNP} from "../../../util/StatefulActionCreator";

type Actions = ConfirmTradeAction | HideWithdrawModalAction

interface DispatchProps {
    onConfirm: () => void,
    onHide: () => void
}

interface StateProps {
    show: boolean
    canConfirm: boolean
}

interface OwnProps {
}

export type WithdrawModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<Store, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: fireNP(dispatch, createConfirmWithdrawAction),
        onHide: fireNP(dispatch, createHideWithdrawModalAction)
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        show: state.modalVisibility.withdrawVisible,
        canConfirm: state.withdrawModalInput.units > 0
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithdrawModal)