import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import AssetSelector from "../../AssetSelector";
import {ThunkDispatch} from "redux-thunk";
import {fire, ThunkDsp} from "../../../util/Thunker";
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

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: fire(dispatch, createDepositModalSetAssetAction),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const assets = Array.from(state.funds.availableFunds.keys());
    return {
        selectedAsset: state.depositModalInput.asset,
        assets: assets
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelector)