import {connect} from "react-redux";
import {Dispatch} from "redux"
import {State} from "../../../state/store/RootStore";
import IConfirmTradeAction from "../../../state/reducers/modal/trade/IConfirmTradeAction";
import WithdrawModal from "./WithdrawModal";
import {WithdrawFundsAction} from "../../../state/reducers/funds/IWithdrawAction";

type Actions = IConfirmTradeAction

interface DispatchProps {
    onConfirm: (asset: string, amount: number) => void,
}

interface StateProps {
    canConfirm: boolean
}

interface OwnProps {
}

export type WithdrawModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: Dispatch<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: (asset: string, amount: number) => WithdrawFundsAction.fire(asset, amount),
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        canConfirm: state.withdrawModalInput.units > 0
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithdrawModal)