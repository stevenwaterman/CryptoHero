import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import ChartCard from "./ChartCard";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction
    from "../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onChartTypeChange: (chartType: string) => void,
}

export interface StateProps {
    chartType: string,
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onChartTypeChange: (chartType: string) => {//TODO fix this so it works}
        },
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        chartType: ""//TODO
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartCard)
