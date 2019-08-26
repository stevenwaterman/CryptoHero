import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import {ThunkDispatch} from "redux-thunk"
import NumberField from "../../NumberField";
import IWithdrawModalSetPercentAction, {WithdrawModalSetPercentAction} from "../../../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetPercentAction";
import IWithdrawModalSetPercentTextAction, {WithdrawModalSetPercentTextAction} from "../../../../state/reducers/modalInputState/withdraw/text/IWithdrawModalSetPercentTextAction";
import IWithdrawModalResetPercentTextAction, {WithdrawModalResetPercentTextAction} from "../../../../state/reducers/modalInputState/withdraw/resetText/IWithdrawModalResetPercentTextAction";

type Actions =
    IWithdrawModalSetPercentAction
    | IWithdrawModalSetPercentTextAction
    | IWithdrawModalResetPercentTextAction

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
        onValueChange: (newPercent) => dispatch(WithdrawModalSetPercentAction.fire(newPercent)),
        onTextChange: (newText) => dispatch(WithdrawModalSetPercentTextAction.fire(newText)),
        onDone: () => dispatch(WithdrawModalResetPercentTextAction.fire()),
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.withdrawModalInput.percentText,
        value: state.withdrawModalInput.percent,
        append: `%`,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)