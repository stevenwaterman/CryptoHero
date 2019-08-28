import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import DepositDescriptionLine from "./DepositDescriptionLine";

interface DispatchProps {
}

interface StateProps {
    asset: string
    units: number,
}

interface OwnProps {
}

export type DepositDescriptionLineProps = DispatchProps & StateProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        asset: state.depositModalInput.asset,
        units: state.depositModalInput.units,
    }
}

export default connect(
    mapStateToProps
)(DepositDescriptionLine)
