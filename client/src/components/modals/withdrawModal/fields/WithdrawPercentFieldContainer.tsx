import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import {ThunkDispatch} from "redux-thunk"
import NumberField from "../../../NumberField";
import WithdrawModalSetPercentAction, {createWithdrawModalSetPercentAction} from "../../../../state/reducers/modalInputState/withdraw/value/WithdrawModalSetPercentAction";
import WithdrawModalSetPercentTextAction, {createWithdrawModalSetPercentTextAction} from "../../../../state/reducers/modalInputState/withdraw/text/WithdrawModalSetPercentTextAction";
import WithdrawModalResetPercentTextAction, {createWithdrawModalResetPercentTextAction} from "../../../../state/reducers/modalInputState/withdraw/resetText/WithdrawModalResetPercentTextAction";
import {fire, fireNP} from "../../../../util/StatefulActionCreator";

type Actions =
    WithdrawModalSetPercentAction
    | WithdrawModalSetPercentTextAction
    | WithdrawModalResetPercentTextAction

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
        onValueChange: fire(dispatch, createWithdrawModalSetPercentAction),
        onTextChange: fire(dispatch, createWithdrawModalSetPercentTextAction),
        onDone: fireNP(dispatch, createWithdrawModalResetPercentTextAction),
    }
}

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