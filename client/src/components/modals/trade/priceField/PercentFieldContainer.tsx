import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import NumberField from "./NumberField";
import ISetAmountAction, {SetAmountAction} from "../../../../state/reducers/trade/value/ISetAmountAction";
import {ThunkDispatch} from "redux-thunk"
import ISetPercentTextAction, {SetPercentTextAction} from "../../../../state/reducers/trade/text/ISetPercentTextAction";

type Actions = ISetAmountAction | ISetPercentTextAction

interface DispatchProps {
    onValueChange: (newPercent: number) => void,
    onTextChange: (newText: string) => void,
}

interface StateProps {
    text: string,
    value: number,
    append: string,
    enable: boolean,
}

interface OwnProps {
    step: number
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: (newPercent) => dispatch(SetAmountAction.fireWithPercent(newPercent)),
        onTextChange: (newText) => dispatch(SetPercentTextAction.fire(newText))
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.trade.percentText,
        value: state.trade.percent,
        append: `% ${state.trade.instrument.asset2}`,
        enable: state.trade.price > 0
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)