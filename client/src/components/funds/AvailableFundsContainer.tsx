import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import AvailableFunds from "./AvailableFunds";
import {ThunkDispatch} from "redux-thunk";
import ShowWithdrawModalAction, {createShowWithdrawModalAction} from "../../modules/modals/withdraw/ShowWithdrawModalAction";
import ShowDepositModalAction, {createShowDepositModalAction} from "../../modules/modals/deposit/ShowDepositModalAction";
import ShowTotalFundsModalAction, {createShowTotalFundsModalAction} from "../../modules/modals/totalFunds/ShowTotalFundsModalAction";
import {fireNP, ThunkDsp} from "../../util/Thunker";

type Actions = ShowTotalFundsModalAction | ShowWithdrawModalAction | ShowDepositModalAction

interface DispatchProps {
    onClickTotalFunds: () => void,
    onClickWithdraw: () => void,
    onClickDeposit: () => void,
}

export interface StateProps {
    availableFunds: Map<string, number>,
}

interface OwnProps {
}

export type AvailableFundsProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onClickTotalFunds: fireNP(dispatch, createShowTotalFundsModalAction),
        onClickWithdraw: fireNP(dispatch, createShowWithdrawModalAction),
        onClickDeposit: fireNP(dispatch, createShowDepositModalAction),
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
