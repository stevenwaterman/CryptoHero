import {connect} from "react-redux";
import {Dispatch} from "redux"
import {State} from "../../../state/store/RootStore";
import IConfirmTradeAction from "../../../state/reducers/modal/trade/IConfirmTradeAction";
import DepositModal from "./DepositModal";
import {DepositFundsAction} from "../../../state/reducers/funds/IDepositAction";

type Actions = IConfirmTradeAction

interface DispatchProps {
    onConfirm: (asset: string, amount: number) => void,
}

interface StateProps {
    canConfirm: boolean
    show: boolean
}

interface OwnProps {
}

export type DepositModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: Dispatch<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: (asset: string, amount: number) => DepositFundsAction.fire(asset, amount),
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        canConfirm: state.depositModalInput.units > 0,
        show: state.modalVisibility.depositVisible
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DepositModal)