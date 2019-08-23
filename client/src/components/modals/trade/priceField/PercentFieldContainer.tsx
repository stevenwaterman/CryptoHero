import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import NumberField from "./NumberField";
import ISetPercentAction, {SetPercentAction} from "../../../../state/reducers/trade/value/ISetPercentAction";
import {ThunkDispatch} from "redux-thunk"
import ISetPercentTextAction, {SetPercentTextAction} from "../../../../state/reducers/trade/text/ISetPercentTextAction";
import IResetPercentTextAction, {ResetPercentTextAction} from "../../../../state/reducers/trade/resetText/IResetPercentTextAction";

type Actions = ISetPercentAction | ISetPercentTextAction | IResetPercentTextAction

interface DispatchProps {
    onValueChange: (newPercent: number) => void,
    onTextChange: (newText: string) => void,
    onDone: () => void,
}

interface StateProps {
    text: string,
    value: number | null,
    append: string,
}

interface OwnProps {
    step: number
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: (newPercent) => dispatch(SetPercentAction.fire(newPercent)),
        onTextChange: (newText) => dispatch(SetPercentTextAction.fire(newText)),
        onDone: () => dispatch(ResetPercentTextAction.fire()),
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.trade.percentText,
        value: state.trade.percent,
        append: `% ${state.trade.instrument.asset2}`,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)