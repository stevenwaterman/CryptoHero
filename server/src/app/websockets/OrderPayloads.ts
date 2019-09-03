import Room from "./Room";
import Big from "big.js";
import Instrument from "../trading/instrument";
import Order from "../trading/order";
import Asset from "../trading/asset";
import Trade from "../trading/trade";

export interface TradeAdded {
    self: Order,
    newTrade: Trade
}

export interface Cancelled {
    self: Order,
}
