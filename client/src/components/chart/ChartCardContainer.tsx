import {connect} from "react-redux";
import {State} from "../../modules/RootStore";
import ChartCard from "./ChartCard";
import {ThunkDispatch} from "redux-thunk";
import ChartSetTypeAction, {createChartSetTypeAction} from "../../modules/components/chart/ChartSetTypeAction";
import {fire, ThunkDsp} from "../../util/Thunker";

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

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
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
