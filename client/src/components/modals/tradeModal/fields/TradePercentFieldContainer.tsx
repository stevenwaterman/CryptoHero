import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import NumberField from "../../../NumberField";
import {ThunkDispatch} from "redux-thunk"
import TradeModalSetPercentAction, {createTradeModalSetPercentAction} from "../../../../state/reducers/modalInputState/trade/value/TradeModalSetPercentAction";
import TradeModalResetPercentTextAction, {createTradeModalResetPercentTextAction} from "../../../../state/reducers/modalInputState/trade/resetText/TradeModalResetPercentTextAction";
import TradeModalSetPercentTextAction, {createTradeModalSetPercentTextAction} from "../../../../state/reducers/modalInputState/trade/text/TradeModalSetPercentTextAction";
import {fire, fireNP} from "../../../../util/StatefulActionCreator";

type Actions = TradeModalSetPercentAction | TradeModalSetPercentTextAction | TradeModalResetPercentTextAction

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
        onValueChange: fire(dispatch, createTradeModalSetPercentAction),
        onTextChange: fire(dispatch, createTradeModalSetPercentTextAction),
        onDone: fireNP(dispatch, createTradeModalResetPercentTextAction),
    }
}

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