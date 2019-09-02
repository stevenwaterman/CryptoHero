import {connect} from "react-redux";
import TradeModalSetPriceAction, {createTradeModalSetPriceAction,} from "../../../../modules/modals/trade/input/value/TradeModalSetPriceAction";
import {State} from "../../../../modules/RootStore";
import NumberField from "../../../NumberField";
import TradeModalSetPriceTextAction, {createTradeModalSetPriceTextAction,} from "../../../../modules/modals/trade/input/text/TradeModalSetPriceTextAction";
import TradeModalResetPriceTextAction, {createTradeModalResetPriceTextAction,} from "../../../../modules/modals/trade/input/resetText/TradeModalResetPriceTextAction";
import {fire, fireNP, ThunkDsp} from "../../../../util/Thunker";

type Actions = TradeModalSetPriceAction | TradeModalSetPriceTextAction | TradeModalResetPriceTextAction

interface DispatchProps {
    onValueChange: (newPrice: number) => void,
    onTextChange: (newText: string) => void,
    onDone: () => void,
}

interface StateProps {
    text: string,
    value: number,
    append: string,
}

interface OwnProps {
    step: number
}

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: fire(dispatch, createTradeModalSetPriceAction),
        onTextChange: fire(dispatch, createTradeModalSetPriceTextAction),
        onDone: fireNP(dispatch, createTradeModalResetPriceTextAction),
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.tradeModalInput.priceText,
        value: state.tradeModalInput.price,
        append: `${state.tradeModal.instrument.asset2} per ${state.tradeModal.instrument.asset1}`,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)