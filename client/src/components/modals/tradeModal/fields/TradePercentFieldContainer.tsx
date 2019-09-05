import {connect} from "react-redux";
import {State} from "../../../../modules/RootStore";
import NumberField from "../../../NumberField";
import TradeModalSetPercentAction, {createTradeModalSetPercentAction} from "../../../../modules/modals/trade/input/value/TradeModalSetPercentAction";
import TradeModalResetPercentTextAction, {createTradeModalResetPercentTextAction} from "../../../../modules/modals/trade/input/resetText/TradeModalResetPercentTextAction";
import TradeModalSetPercentTextAction, {createTradeModalSetPercentTextAction} from "../../../../modules/modals/trade/input/text/TradeModalSetPercentTextAction";
import {fire, fireNP, ThunkDsp} from "../../../../util/Thunker";
import Big from "big.js";

type Actions = TradeModalSetPercentAction | TradeModalSetPercentTextAction | TradeModalResetPercentTextAction

interface DispatchProps {
    onValueChange: (newPercent: Big) => void,
    onTextChange: (newText: string) => void,
    onDone: () => void,
}

interface StateProps {
    text: string,
    value: Big | null,
    append: string,
}

interface OwnProps {
    step: number
}

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
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