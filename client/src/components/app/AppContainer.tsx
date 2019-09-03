import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import {ThunkDsp} from "../../util/Thunker";
import {createReloadAction, LoadAccountAction} from "../../modules/global/LoadAccountAction";
import App from "./App";
import {createCreateAccountAction} from "../../modules/global/CreateAccountAction";

type Actions = LoadAccountAction

interface DispatchProps {
    createAccount: () => void,
}

export interface StateProps {
}

interface OwnProps {
}

export type AppProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        createAccount: async () => {
            await dispatch(createCreateAccountAction())
        },
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
