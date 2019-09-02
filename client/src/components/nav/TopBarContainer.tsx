import {connect} from "react-redux";
import Instrument from "../../models/Instrument";
import {State} from "../../modules/RootStore";
import TopBar from "./TopBar";
import {fireNP, ThunkDsp} from "../../util/Thunker";
import {createShowTotalFundsModalAction} from "../../modules/modals/totalFunds/ShowTotalFundsModalAction";
import {createShowWithdrawModalAction} from "../../modules/modals/withdraw/ShowWithdrawModalAction";
import {createShowDepositModalAction} from "../../modules/modals/deposit/ShowDepositModalAction";
import {CreateAccountAction, createCreateAccountAction} from "../../modules/global/CreateAccountAction";
import {createLoadAction, LoadAccountAction} from "../../modules/global/LoadAccountAction";

type Actions = CreateAccountAction | LoadAccountAction;

interface DispatchProps {
    createAccount: () => void
    selectAccount: (accountId: string) => void
}

interface StateProps {
    selectedId: string
    accounts: Array<string>
}

interface OwnProps {
}

export type TopBarProps = DispatchProps & StateProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        createAccount: async () => await dispatch(createCreateAccountAction()),
        selectAccount: async (accountId: string) => await dispatch(createLoadAction(accountId))
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        selectedId: state.account.selectedId,
        accounts: state.account.accounts
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBar)
