import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import WithdrawDescriptionLine from "./WithdrawDescriptionLine";

interface DispatchProps {
}

interface StateProps {
    asset: string
    units: number,
}

interface OwnProps {
}

export type WithdrawDescriptionLineProps = DispatchProps & StateProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        asset: state.withdrawModalInput.asset,
        units: state.withdrawModalInput.units,
    }
}

export default connect(
    mapStateToProps
)(WithdrawDescriptionLine)
