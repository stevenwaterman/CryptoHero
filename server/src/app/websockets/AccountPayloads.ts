import Room from "./Room";
import Big from "big.js";
import Instrument from "../trading/instrument";
import Order from "../trading/order";
import Asset from "../trading/asset";
import Account from "../trading/account";

export interface NewOrder {
    self: Account,
    newOrder: Order
}

export interface OrderChanged {
    self: Account,
    changedOrder: Order
}

export interface FundsChanged {
    self: Account,
    asset: Asset,
    newAmount: Big
}