import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import {ThunkDispatch} from "redux-thunk";
import ChartSetTypeAction, {createChartSetTypeAction} from "../../modules/components/chart/ChartSetTypeAction";
import {fire, ThunkDsp} from "../../util/Thunker";
import {createAccountAction, SetAccountAction} from "../../modules/global/SetAccountAction";
import {bindActionCreators} from "redux";
import App from "./App";

type Actions = SetAccountAction

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
            await dispatch(createAccountAction())
        }
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
