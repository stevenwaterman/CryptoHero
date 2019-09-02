import {connect} from "react-redux";
import {Store} from "redux"
import {State} from "../../../modules/RootStore";
import DepositModal from "./DepositModal";
import {ThunkDispatch} from "redux-thunk";
import ConfirmDepositAction, {createConfirmDepositAction} from "../../../modules/components/availableFunds/ConfirmDepositAction";
import HideDepositModalAction, {createHideDepositModalAction} from "../../../modules/modals/deposit/HideDepositModalAction";
import {fireNP, ThunkDsp} from "../../../util/Thunker";

type Actions = ConfirmDepositAction | HideDepositModalAction

interface DispatchProps {
    onConfirm: () => void,
    onHide: () => void,
}

interface StateProps {
    canConfirm: boolean
    show: boolean
}

interface OwnProps {
}

export type DepositModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: () => dispatch(createConfirmDepositAction()),
        onHide: fireNP(dispatch, createHideDepositModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        canConfirm: state.depositModalInput.units > 0,
        show: state.modalVisibility.depositVisible
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DepositModal)