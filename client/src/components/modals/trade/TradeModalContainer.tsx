import {connect} from "react-redux";
import {Dispatch} from "redux"
import Instrument from "../../../models/Instrument";
import {State} from "../../../state/store/RootStore";
import IConfirmTradeAction, {ConfirmTradeAction} from "../../../state/reducers/trade/IConfirmTradeAction";
import TradeModal from "./TradeModal";

type Actions = IConfirmTradeAction

interface DispatchProps {
    onConfirm: () => void,
}

interface StateProps {
    initialPrice: number,
    buying: boolean
    asset1: string,
    asset2: string,
    sourceAsset: string,
    targetAsset: string,
    sourceFundsAvailable: number,
    targetFundsAvailable: number,
}

interface OwnProps {
}

export type TradeModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: Dispatch<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: () => dispatch(ConfirmTradeAction.create()),
    }
}

function price(state: State): number {
    const prices: Array<[Instrument, number]> = state.instruments.prices;
    const instrument = state.trade.instrument;
    const found = (prices.find(([check]) => check.name === instrument.name));
    const [_, price] = (found as [Instrument, number]);
    return price;
}

function source(state: State): string {
    return state.trade.buying ? state.trade.instrument.asset2 : state.trade.instrument.asset1
}

function target(state: State): string {
    return state.trade.buying ? state.trade.instrument.asset1 : state.trade.instrument.asset2
}

function availableToSpendSource(state: State): number {
    return availableToSpend(source(state), state.funds.availableFunds)
}

function availableToSpendTarget(state: State): number {
    return availableToSpend(target(state), state.funds.availableFunds)
}

function availableToSpend(asset: string, funds: Array<[string, number]>): number {
    const found = funds.find(([checkAsset]) => checkAsset === asset);
    const [_, amount] = found as [string, number];
    return amount;
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const sourceFundsAvailable = availableToSpendSource(state);
    const targetFundsAvailable = availableToSpendTarget(state);

    return {
        initialPrice: price(state),
        buying: state.trade.buying,
        asset1: state.trade.instrument.asset1,
        asset2: state.trade.instrument.asset2,
        sourceAsset: source(state),
        targetAsset: target(state),
        sourceFundsAvailable: sourceFundsAvailable,
        targetFundsAvailable: targetFundsAvailable
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeModal)