import {connect} from "react-redux";
import Instrument from "../../models/Instrument";
import {State} from "../../modules/RootStore";
import TopBar from "./TopBar";

interface DispatchProps {
}

interface StateProps {
    accountId: string
}

interface OwnProps {
}

export type TopBarProps = DispatchProps & StateProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        accountId: state.account.id
    }
}

export default connect(
    mapStateToProps
)(TopBar)
