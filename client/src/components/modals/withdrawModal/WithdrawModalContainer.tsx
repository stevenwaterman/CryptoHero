import {connect} from "react-redux";
import {Store} from "redux"
import {State} from "../../../state/store/RootStore";
import IConfirmTradeAction from "../../../state/reducers/modal/trade/IConfirmTradeAction";
import WithdrawModal from "./WithdrawModal";
import {ConfirmWithdrawAction} from "../../../state/reducers/funds/IConfirmWithdrawAction";
import {ThunkDispatch} from "redux-thunk";
import IHideWithdrawModalAction, {HideWithdrawModalAction} from "../../../state/reducers/modal/withdraw/IHideWithdrawModalAction";

type Actions = IConfirmTradeAction | IHideWithdrawModalAction

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
        onConfirm: dispatch(ConfirmWithdrawAction.fire),
        onHide: dispatch(HideWithdrawModalAction.fire)
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