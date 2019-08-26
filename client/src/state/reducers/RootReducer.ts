import {combineReducers} from "redux";
import {instrumentReducer} from "./instrument/InstrumentReducer";
import {tradeModalReducer} from "./modal/trade/TradeModalReducer";
import {fundsReducer} from "./funds/FundsReducer";
import {tradeModalInputReducer} from "./modalInputState/trade/TradeModalInputReducer";
import {withdrawModalInputReducer} from "./modalInputState/withdraw/WithdrawModalInputReducer";
import {withdrawModalReducer} from "./modal/withdraw/WithdrawModalReducer";
import {depositModalReducer} from "./modal/deposit/DepositModalReducer";
import {depositModalInputReducer} from "./modalInputState/deposit/DepositModalInputReducer";

export default combineReducers({
    instruments: instrumentReducer,
    funds: fundsReducer,

    tradeModal: tradeModalReducer,
    tradeModalInput: tradeModalInputReducer,

    withdrawModal: withdrawModalReducer,
    withdrawModalInput: withdrawModalInputReducer,

    depositModal: depositModalReducer,
    depositModalInput: depositModalInputReducer,
})