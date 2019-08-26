import {connect} from "react-redux";
import {Store} from "redux"
import {State} from "../../../state/store/RootStore";
import DepositModal from "./DepositModal";
import {ConfirmDepositAction} from "../../../state/reducers/funds/IConfirmDepositAction";
import IInstrumentSelectionAction from "../../../state/reducers/instrument/IInstrumentSelectionAction";
import {ThunkDispatch} from "redux-thunk";
import {HideDepositModalAction} from "../../../state/reducers/modal/deposit/IHideDepositModalAction";

type Actions = IInstrumentSelectionAction

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

function mapDispatchToProps(dispatch: ThunkDispatch<Store, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: () => dispatch(ConfirmDepositAction.fire()),
        onHide: () => dispatch(HideDepositModalAction.fire)
    }
}

// noinspection JSUnusedLocalSymbols
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