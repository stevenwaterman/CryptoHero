import {connect} from "react-redux";
import {State} from "../../../../modules/RootStore";
import NumberField from "../../../NumberField";
import WithdrawModalSetPercentAction, {createWithdrawModalSetPercentAction} from "../../../../modules/modals/withdraw/input/value/WithdrawModalSetPercentAction";
import WithdrawModalSetPercentTextAction, {createWithdrawModalSetPercentTextAction} from "../../../../modules/modals/withdraw/input/text/WithdrawModalSetPercentTextAction";
import WithdrawModalResetPercentTextAction, {createWithdrawModalResetPercentTextAction} from "../../../../modules/modals/withdraw/input/resetText/WithdrawModalResetPercentTextAction";
import {fire, fireNP, ThunkDsp} from "../../../../util/Thunker";
import Big from "big.js";

type Actions =
    WithdrawModalSetPercentAction
    | WithdrawModalSetPercentTextAction
    | WithdrawModalResetPercentTextAction

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