import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import TradeModal from "./TradeModal";
import {fireNP, ThunkDsp} from "../../../util/Thunker";
import ConfirmTradeAction, {createConfirmTradeAction} from "../../../modules/modals/trade/ConfirmTradeAction";
import HideTradeModalAction, {createHideTradeModalAction} from "../../../modules/modals/trade/HideTradeModalAction";

type Actions = ConfirmTradeAction | HideTradeModalAction

interface DispatchProps {
    onConfirm: () => void,
    onHide: () => void,
}

interface StateProps {
    show: boolean,
    buying: boolean
    canConfirm: boolean,
    asset1: string,
    sourceAsset: string,
    targetAsset: string,
}

interface OwnProps {
}

export type TradeModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: async () => {
            await dispatch(createConfirmTradeAction())
        },
        onHide: fireNP(dispatch, createHideTradeModalAction)
    }
}

function source(state: State): string {
    return state.tradeModal.buying ? state.tradeModal.instrument.asset2 : state.tradeModal.instrument.asset1
}

function target(state: State): string {
    return state.tradeModal.buying ? state.tradeModal.instrument.asset1 : state.tradeModal.instrument.asset2
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const canConfirm =
        state.tradeModalInput.units.gt(0) &&
        state.blotter.orders.filter(it =>
            it.instrument.name === state.tradeModal.instrument.name &&
            it.isBuy !== state.tradeModal.buying &&
            (
                (it.isBuy && it.unitPrice.gte(state.tradeModalInput.price)) ||
                (!it.isBuy && it.unitPrice.lte(state.tradeModalInput.price))
            )
        ).length === 0;

    return {
        show: state.modalVisibility.tradeVisible,
        buying: state.tradeModal.buying,
        canConfirm: canConfirm,
        asset1: state.tradeModal.instrument.asset1,
        sourceAsset: source(state),
        targetAsset: target(state),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeModal)