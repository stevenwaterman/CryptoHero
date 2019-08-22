import {combineReducers} from "redux";
import {instrumentReducer} from "./instrument/InstrumentReducer";
import {tradeReducer} from "./trade/TradeReducer";
import {fundsReducer} from "./funds/FundsReducer";

export default combineReducers({
    instruments: instrumentReducer,
    trade: tradeReducer,
    funds: fundsReducer
})