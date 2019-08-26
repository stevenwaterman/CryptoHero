import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import AvailableFunds from "./AvailableFunds";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction
    from "../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";
import {ShowWithdrawModalAction} from "../../state/reducers/modal/withdraw/IShowWithdrawModalAction";
import {ShowDepositModalAction} from "../../state/reducers/modal/deposit/IShowDepositModalAction";
import {ShowTotalFundsModalAction} from "../../state/reducers/modal/totalFunds/IShowTotalFundsModalAction";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onClickTotalFunds: () => void,
    onClickWithdraw: () => void,
    onClickDeposit: () => void,
}

export interface StateProps {
    availableFunds: Array<[string, number]>,
}

interface OwnProps {
}

export type AvailableFundsProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onClickTotalFunds: () => dispatch(ShowTotalFundsModalAction.fire()),
        onClickWithdraw: () => dispatch(ShowWithdrawModalAction.fire()),
        onClickDeposit: () => dispatch(ShowDepositModalAction.fire()),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        availableFunds: state.funds.availableFunds
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvailableFunds)
