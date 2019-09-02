import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import TopBar from "./TopBar";
import {ThunkDsp} from "../../util/Thunker";
import {CreateAccountAction, createCreateAccountAction} from "../../modules/global/CreateAccountAction";
import {createLoadAction, createReloadAction, LoadAccountAction} from "../../modules/global/LoadAccountAction";

type Actions = CreateAccountAction | LoadAccountAction;

interface DispatchProps {
    createAccount: () => void
    reload: () => void
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
        reload: async () => await dispatch(createReloadAction()),
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
