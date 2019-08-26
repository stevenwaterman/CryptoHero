import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import ChartCard from "./ChartCard";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction
    from "../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onSelectHistorical: () => void,
    onSelectCurrent: () => void,
}

export interface StateProps {
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onSelectCurrent: () => {
        },//TODO should be an actual chart
        onSelectHistorical: () => {
        },
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartCard)
