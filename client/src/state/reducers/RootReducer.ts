import {combineReducers} from "redux";
import {instrumentReducer} from "./instrument/InstrumentReducer";
import {tradeModalReducer} from "./modal/trade/TradeModalReducer";
import {fundsReducer} from "./funds/FundsReducer";
import {tradeModalInputReducer} from "./modalInputState/trade/TradeModalInputReducer";
import {withdrawModalInputReducer} from "./modalInputState/withdraw/WithdrawModalInputReducer";
import {depositModalInputReducer} from "./modalInputState/deposit/DepositModalInputReducer";
import {blotterReducer} from "./blotter/BlotterReducer";
import {modalVisibilityReducer} from "./modal/ModalVisibilityReducer";
import {viewTradeModalReducer} from "./modal/viewTrade/ViewTradeModalReducer";
import {chartReducer} from "./chart/ChartReducer";
import {totalFundsModalReducer} from "./modal/totalFunds/TotalFundsModalReducer";

export default combineReducers({
    modalVisibility: modalVisibilityReducer,
    instruments: instrumentReducer,
    funds: fundsReducer,
    blotter: blotterReducer,
    chart: chartReducer,

    tradeModal: tradeModalReducer,
    tradeModalInput: tradeModalInputReducer,

    withdrawModalInput: withdrawModalInputReducer,
    depositModalInput: depositModalInputReducer,

    viewTradeModal: viewTradeModalReducer,
    totalFundsModal: totalFundsModalReducer
})