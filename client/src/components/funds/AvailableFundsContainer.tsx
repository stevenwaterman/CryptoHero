import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import AvailableFunds from "./AvailableFunds";
import {ThunkDispatch} from "redux-thunk";
import ShowWithdrawModalAction, {createShowWithdrawModalAction} from "../../state/reducers/modal/withdraw/ShowWithdrawModalAction";
import ShowDepositModalAction, {createShowDepositModalAction} from "../../state/reducers/modal/deposit/ShowDepositModalAction";
import ShowTotalFundsModalAction, {createShowTotalFundsModalAction} from "../../state/reducers/modal/totalFunds/ShowTotalFundsModalAction";
import {fireNP} from "../../util/StatefulActionCreator";

type Actions = ShowTotalFundsModalAction | ShowWithdrawModalAction | ShowDepositModalAction

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
