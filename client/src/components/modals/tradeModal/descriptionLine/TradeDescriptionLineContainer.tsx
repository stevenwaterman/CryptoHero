import {connect} from "react-redux";
import {State} from "../../../../modules/RootStore";
import TradeDescriptionLine from "./TradeDescriptionLine";
import Big from "big.js";
import Order from "../../../../models/Order";

interface DispatchProps {
}

interface StateProps {
    buying: boolean

    units: Big,
    price: Big,

    asset1: string
    asset1Amount: Big

    asset2: string,
    asset2Amount: Big,

    selfTrade: Big | null,
}

interface OwnProps {
}

export type TradeDescriptionLineProps = DispatchProps & StateProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    let selfTradeOrder: Order | undefined = state.blotter.orders.filter(it =>
        it.instrument.name === state.tradeModal.instrument.name &&
        it.isBuy !== state.tradeModal.buying &&
        it.state === "pending" &&
        (
            (it.isBuy && it.unitPrice.gte(state.tradeModalInput.price)) ||
            (!it.isBuy && it.unitPrice.lte(state.tradeModalInput.price))
        )
    ).reduce((best: Order | undefined, curr: Order) => {
        if(best == null) return curr;
        if (curr.isBuy) {
            if (curr.unitPrice.gt(best.unitPrice)) return curr;
        } else{
            if (curr.unitPrice.lt(best.unitPrice)) return curr;
        }
        return best;
    }, undefined);

    let selfTradePrice: Big | null = selfTradeOrder == null ? null : selfTradeOrder.unitPrice;

    return {
        buying: state.tradeModal.buying,
        asset1: state.tradeModal.instrument.asset1,
        asset1Amount: state.tradeModalInput.units,
        asset2: state.tradeModal.instrument.asset2,
        asset2Amount: state.tradeModalInput.units.mul(state.tradeModalInput.price),
        price: state.tradeModalInput.price,
        units: state.tradeModalInput.units,
        selfTrade: selfTradePrice
    }
}

export default connect(
    mapStateToProps
)(TradeDescriptionLine)
