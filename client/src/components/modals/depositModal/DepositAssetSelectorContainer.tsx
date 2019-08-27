import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import AssetSelector from "../../AssetSelector";
import {ThunkDispatch} from "redux-thunk";
import {fire} from "../../../util/StatefulActionCreator";
import DepositModalSetAssetAction, {createDepositModalSetAssetAction} from "../../../state/reducers/modalInputState/deposit/DepositModalSetAssetAction";

type Actions = DepositModalSetAssetAction

interface DispatchProps {
    onValueChange: (newAsset: string) => void,
}

interface StateProps {
    assets: Array<string>,
    selectedAsset: string
}

interface OwnProps {
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: fire(dispatch, createDepositModalSetAssetAction),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        selectedAsset: state.depositModalInput.asset,
        assets: state.funds.availableFunds.map(it => it[0])
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelector)
