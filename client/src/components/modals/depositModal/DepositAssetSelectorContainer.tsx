import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import AssetSelector from "../../AssetSelector";
import {ThunkDispatch} from "redux-thunk";
import IDepositModalSetAssetAction, {DepositModalSetAssetAction} from "../../../state/reducers/modalInputState/deposit/IDepositModalSetAssetAction";

type Actions = IDepositModalSetAssetAction

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
        onValueChange: newAsset => dispatch(DepositModalSetAssetAction.fire(newAsset)),
    }
}

// noinspection JSUnusedLocalSymbols
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
