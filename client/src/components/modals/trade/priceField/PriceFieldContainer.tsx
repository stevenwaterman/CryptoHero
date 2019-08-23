import {connect} from "react-redux";
import ISetPriceAction, {SetPriceAction} from "../../../../state/reducers/trade/value/ISetPriceAction";
import {State} from "../../../../state/store/RootStore";
import NumberField from "./NumberField";
import {ThunkDispatch} from "redux-thunk"
import ISetPriceTextAction, {SetPriceTextAction} from "../../../../state/reducers/trade/text/ISetPriceTextAction";

type Actions = ISetPriceAction | ISetPriceTextAction

interface DispatchProps {
    onValueChange: (newPrice: number) => void,
    onTextChange: (newText: string) => void,
}

interface StateProps {
    text: string,
    value: number,
    append: string,
    enable: boolean
}

interface OwnProps {
    step: number
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: (newPrice) => dispatch(SetPriceAction.fire(newPrice)),
        onTextChange: (newText) => dispatch(SetPriceTextAction.fire(newText))
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.trade.priceText,
        value: state.trade.price,
        append: state.trade.instrument.asset2,
        enable: true
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)