import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import {ThunkDsp} from "../../util/Thunker";
import {LoadAccountAction} from "../../modules/global/LoadAccountAction";
import LoadingPlaceholder from "./LoadingPlaceholder";
import {createCreateAccountAction} from "../../modules/global/CreateAccountAction";

type Actions = LoadAccountAction

interface DispatchProps {
    createAccount: () => void
}

export interface StateProps {
    loading: boolean,
}

interface OwnProps {
}

export type LoadingPlaceholderProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        createAccount: async () => {
            await dispatch(createCreateAccountAction())
        },
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        loading: state.account.selectedId === ""
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingPlaceholder)
