import {connect} from "react-redux";
import {State} from "../../state/store/RootStore";
import AvailableFunds from "./AvailableFunds";

interface DispatchProps {
}

export interface StateProps {
    availableFunds: Array<[string, number]>,
}

interface OwnProps {
}

export type AvailableFundsProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        availableFunds: state.funds.availableFunds
    }
}

export default connect(
    mapStateToProps,
)(AvailableFunds)
