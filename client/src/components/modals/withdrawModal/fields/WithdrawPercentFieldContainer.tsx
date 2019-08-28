import {connect} from "react-redux";
import {State} from "../../../../modules/RootStore";
import {ThunkDispatch} from "redux-thunk"
import NumberField from "../../../NumberField";
import WithdrawModalSetPercentAction, {createWithdrawModalSetPercentAction} from "../../../../modules/modals/withdraw/input/value/WithdrawModalSetPercentAction";
import WithdrawModalSetPercentTextAction, {createWithdrawModalSetPercentTextAction} from "../../../../modules/modals/withdraw/input/text/WithdrawModalSetPercentTextAction";
import WithdrawModalResetPercentTextAction, {createWithdrawModalResetPercentTextAction} from "../../../../modules/modals/withdraw/input/resetText/WithdrawModalResetPercentTextAction";
import {fire, fireNP, ThunkDsp} from "../../../../util/Thunker";

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

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
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