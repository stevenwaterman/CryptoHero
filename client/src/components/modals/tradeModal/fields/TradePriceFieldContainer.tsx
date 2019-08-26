import {connect} from "react-redux";
import ITradeModalSetPriceAction, {TradeModalSetPriceAction} from "../../../../state/reducers/modalInputState/trade/value/ITradeModalSetPriceAction";
import {State} from "../../../../state/store/RootStore";
import NumberField from "../../../NumberField";
import {ThunkDispatch} from "redux-thunk"
import ITradeModalSetPriceTextAction, {TradeModalSetPriceTextAction} from "../../../../state/reducers/modalInputState/trade/text/ITradeModalSetPriceTextAction";
import ITradeModalResetPriceTextAction, {TradeModalResetPriceTextAction} from "../../../../state/reducers/modalInputState/trade/resetText/ITradeModalResetPriceTextAction";

type Actions = ITradeModalSetPriceAction | ITradeModalSetPriceTextAction | ITradeModalResetPriceTextAction

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

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: (newPrice) => dispatch(TradeModalSetPriceAction.fire(newPrice)),
        onTextChange: (newText) => dispatch(TradeModalSetPriceTextAction.fire(newText)),
        onDone: () => dispatch(TradeModalResetPriceTextAction.fire()),
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