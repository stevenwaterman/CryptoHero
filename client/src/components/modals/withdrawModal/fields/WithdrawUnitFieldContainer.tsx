import {connect} from "react-redux";
import {State} from "../../../../modules/RootStore";
import NumberField from "../../../NumberField";
import WithdrawModalSetUnitsAction, {createWithdrawModalSetUnitsAction} from "../../../../modules/modals/withdraw/input/value/WithdrawModalSetUnitsAction";
import WithdrawModalResetUnitsTextAction, {createWithdrawModalResetUnitsTextAction} from "../../../../modules/modals/withdraw/input/resetText/WithdrawModalResetUnitsTextAction";
import WithdrawModalSetUnitsTextAction, {createWithdrawModalSetUnitsTextAction} from "../../../../modules/modals/withdraw/input/text/WithdrawModalSetUnitsTextAction";
import {fire, fireNP, ThunkDsp} from "../../../../util/Thunker";

type Actions = WithdrawModalSetUnitsAction | WithdrawModalSetUnitsTextAction | WithdrawModalResetUnitsTextAction

interface DispatchProps {
    onValueChange: (newUnits: number) => void,
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
        onValueChange: fire(dispatch, createWithdrawModalSetUnitsAction),
        onTextChange: fire(dispatch, createWithdrawModalSetUnitsTextAction),
        onDone: fireNP(dispatch, createWithdrawModalResetUnitsTextAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.withdrawModalInput.unitsText,
        value: state.withdrawModalInput.units,
        append: state.withdrawModalInput.asset,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)