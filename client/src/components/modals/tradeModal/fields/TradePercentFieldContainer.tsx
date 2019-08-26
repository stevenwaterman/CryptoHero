import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import NumberField from "../../../NumberField";
import ITradeModalSetPercentAction, {TradeModalSetPercentAction} from "../../../../state/reducers/modalInputState/trade/value/ITradeModalSetPercentAction";
import {ThunkDispatch} from "redux-thunk"
import ITradeModalSetPercentTextAction, {TradeModalSetPercentTextAction} from "../../../../state/reducers/modalInputState/trade/text/ITradeModalSetPercentTextAction";
import ITradeModalResetPercentTextAction, {TradeModalResetPercentTextAction} from "../../../../state/reducers/modalInputState/trade/resetText/ITradeModalResetPercentTextAction";

type Actions = ITradeModalSetPercentAction | ITradeModalSetPercentTextAction | ITradeModalResetPercentTextAction

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
        onValueChange: (newPercent) => dispatch(TradeModalSetPercentAction.fire(newPercent)),
        onTextChange: (newText) => dispatch(TradeModalSetPercentTextAction.fire(newText)),
        onDone: () => dispatch(TradeModalResetPercentTextAction.fire()),
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.tradeModalInput.percentText,
        value: state.tradeModalInput.percent,
        append: `% ${state.tradeModal.instrument.asset2}`,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)