import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import ViewTradeModal from "./ViewTradeModal";
import Instrument from "../../../models/Instrument";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction
    from "../../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";
import {CancelOrderAction} from "../../../state/reducers/blotter/ICancelOrderAction";
import {HideViewTradeModalAction} from "../../../state/reducers/modal/viewTrade/IHideViewTradeModalAction";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onClickCancel: () => void,
    onHide: () => void
}

interface StateProps {
    show: boolean,
    id: string,
    time: Date,
    buying: boolean,
    instrument: Instrument,
    units: number,
    price: number,

    remaining: number,
    averagePrice: number | null,
}

interface OwnProps {
}

export type ViewTradeModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onClickCancel: () => CancelOrderAction.fire,
        onHide: () => HideViewTradeModalAction.fire()
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        show: state.modalVisibility.viewTradeVisible,
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