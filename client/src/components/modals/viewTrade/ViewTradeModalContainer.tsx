import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import ViewTradeModal from "./ViewTradeModal";
import Instrument from "../../../models/Instrument";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction
    from "../../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";
import {CancelOrderAction} from "../../../state/reducers/blotter/ICancelOrderAction";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onClickCancel: () => void
}

interface StateProps {
    readonly id: string,
    readonly time: Date,
    readonly buying: boolean,
    readonly instrument: Instrument,
    readonly units: number,
    readonly price: number,

    readonly remaining: number,
    readonly averagePrice: number | null,
}

interface OwnProps {
}

export type TotalFundsModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onClickCancel: () => (CancelOrderAction.fire),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        averagePrice: state.viewTradeModal.averagePrice,
        buying: state.viewTradeModal.buying,
        id: state.viewTradeModal.id,
        instrument: state.viewTradeModal.instrument,
        price: state.viewTradeModal.price,
        remaining: state.viewTradeModal.remaining,
        time: state.viewTradeModal.time,
        units: state.viewTradeModal.units
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewTradeModal)