import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import ChartCard from "./ChartCard";
import {ThunkDispatch} from "redux-thunk";
import ChartSetTypeAction, {createChartSetTypeAction} from "../../state/reducers/chart/ChartSetTypeAction";
import {fire} from "../../util/Thunker";

type Actions = ChartSetTypeAction

interface DispatchProps {
    onChartTypeChange: (selectedHistorical: boolean) => void,
}

export interface StateProps {
    showHistorical: boolean,
}

interface OwnProps {
}

export type ChartCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onChartTypeChange: fire(dispatch, createChartSetTypeAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        showHistorical: state.chart.showHistorical
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartCard)
