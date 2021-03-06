import {connect} from "react-redux";
import InstrumentCard from "./InstrumentCard";
import Instrument from "../../../models/Instrument";
import InstrumentSelectionAction, {createInstrumentSelectionAction} from "../../../modules/components/instruments/InstrumentSelectionAction";
import ShowTradeModalAction, {createShowTradeModalAction} from "../../../modules/modals/trade/ShowTradeModalAction";
import {fire, ThunkDsp} from "../../../util/Thunker";
import {State} from "../../../modules/RootStore";
import Big from "big.js";

type Actions = InstrumentSelectionAction | ShowTradeModalAction

interface DispatchProps {
    onCardClick: (instrument: Instrument) => void,
    onTradeClick: ([buy, instrument]: [boolean, Instrument]) => void,
}

interface StateProps {
    selected: boolean,
    price: Big,
    canBuy: boolean,
    canSell: boolean
}

interface OwnProps {
    instrument: Instrument,
}

export type InstrumentCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onCardClick: fire(dispatch, createInstrumentSelectionAction),
        onTradeClick: fire(dispatch, createShowTradeModalAction),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        canBuy: (state.funds.availableFunds.get(ownProps.instrument.asset2) as Big).gt(0),
        canSell: (state.funds.availableFunds.get(ownProps.instrument.asset1) as Big).gt(0),
        price: state.instruments.prices.get(ownProps.instrument.name) as Big,
        selected: state.instruments.selectedInstrument.name === ownProps.instrument.name

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentCard)