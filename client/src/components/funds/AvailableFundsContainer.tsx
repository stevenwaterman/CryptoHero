import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import AvailableFunds from "./AvailableFunds";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction
    from "../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";
import {StartWithdrawAction} from "../../state/reducers/modal/withdraw/IStartWithdrawAction";
import {StartDepositAction} from "../../state/reducers/modal/deposit/IStartDepositAction";

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
        onClickTotalFunds: () => {
        }, //TODO total funds should actually work out the info
        onClickWithdraw: () => dispatch(StartWithdrawAction.fire()),
        onClickDeposit: () => dispatch(StartDepositAction.fire()),
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
