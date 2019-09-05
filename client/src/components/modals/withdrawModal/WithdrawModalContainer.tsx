import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import ConfirmTradeAction from "../../../modules/modals/trade/ConfirmTradeAction";
import WithdrawModal from "./WithdrawModal";
import HideWithdrawModalAction, {createHideWithdrawModalAction,} from "../../../modules/modals/withdraw/HideWithdrawModalAction";
import {createConfirmWithdrawAction} from "../../../modules/components/availableFunds/ConfirmWithdrawAction";
import {fireNP, ThunkDsp} from "../../../util/Thunker";

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

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: () => dispatch(createConfirmWithdrawAction()),
        onHide: fireNP(dispatch, createHideWithdrawModalAction)
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        show: state.modalVisibility.withdrawVisible,
        canConfirm: state.withdrawModalInput.units.gt(0)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithdrawModal)