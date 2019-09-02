import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import TotalFundsModal from "./TotalFundsModal";
import HideTotalFundsModalAction, {createHideTotalFundsModalAction} from "../../../modules/modals/totalFunds/HideTotalFundsModalAction";
import {fireNP, ThunkDsp} from "../../../util/Thunker";

type Actions = HideTotalFundsModalAction

interface DispatchProps {
    onHide: () => void;
}

interface StateProps {
    totalFunds: Map<string, number>
    show: boolean
}

interface OwnProps {
}

export type TotalFundsModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onHide: fireNP(dispatch, createHideTotalFundsModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        totalFunds: state.totalFundsModal.funds,
        show: state.modalVisibility.totalFundsVisible
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TotalFundsModal)