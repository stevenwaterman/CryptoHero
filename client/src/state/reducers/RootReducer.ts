import {combineReducers} from "redux";
import {instrumentReducer} from "./instrument/InstrumentReducer";
import {tradeModalReducer} from "./modal/trade/TradeModalReducer";
import {fundsReducer} from "./funds/FundsReducer";
import {tradeModalInputReducer} from "./modalInputState/trade/TradeModalInputReducer";
import {withdrawModalInputReducer} from "./modalInputState/withdraw/WithdrawModalInputReducer";
import {depositModalInputReducer} from "./modalInputState/deposit/DepositModalInputReducer";

export default combineReducers({
    instruments: instrumentReducer,
    funds: fundsReducer,

    tradeModal: tradeModalReducer,
    tradeModalInput: tradeModalInputReducer,

    withdrawModalInput: withdrawModalInputReducer,
    depositModalInput: depositModalInputReducer,
})