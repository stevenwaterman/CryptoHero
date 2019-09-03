import Room from "./Room";
import Big from "big.js";
import Instrument from "../trading/instrument";
import PriceAggregate, {PriceAggregateElement} from "../brokers/priceAggregate";

export interface AggregatePricePayload {
    instrument: Instrument,
    delta: PriceAggregate
}

const AggregatePriceRoom = new Room<AggregatePricePayload>();
export default AggregatePriceRoom