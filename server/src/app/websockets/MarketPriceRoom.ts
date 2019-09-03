import Room from "./Room";
import Big from "big.js";
import Instrument from "../trading/instrument";

export interface MarketPricePayload {
    time: number,
    instrument: Instrument,
    newPrice: Big
}

const MarketPriceRoom = new Room<MarketPricePayload>();
export default MarketPriceRoom