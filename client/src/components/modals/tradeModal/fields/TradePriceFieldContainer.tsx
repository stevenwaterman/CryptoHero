import {connect} from "react-redux";
import TradeModalSetPriceAction, {createTradeModalSetPriceAction,} from "../../../../state/reducers/modalInputState/trade/value/TradeModalSetPriceAction";
import {State} from "../../../../state/store/RootStore";
import NumberField from "../../../NumberField";
import {ThunkDispatch} from "redux-thunk"
import TradeModalSetPriceTextAction, {createTradeModalSetPriceTextAction,} from "../../../../state/reducers/modalInputState/trade/text/TradeModalSetPriceTextAction";
import TradeModalResetPriceTextAction, {createTradeModalResetPriceTextAction,} from "../../../../state/reducers/modalInputState/trade/resetText/TradeModalResetPriceTextAction";
import {fire, fireNP} from "../../../../util/StatefulActionCreator";

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

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
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