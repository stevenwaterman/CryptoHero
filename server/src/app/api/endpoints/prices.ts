import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import PriceAggregate from "../../brokers/priceAggregate";
import Instrument from "../../trading/instrument";
import {Map} from "immutable";
import SER from "../util/serialisation/SER";
import Big from "big.js";
import {urlGetInstrument} from "../util/paramaters/url/urlGetInstrument";

export function setupPriceEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/api/prices/aggregate", withBroker(broker, aggregatePrices));
    app.get("/api/prices/market", withBroker(broker, marketPrices));

    app.get("/api/prices/:instrument/aggregate", withBroker(broker, instrumentAggregatePrice));
    app.get("/api/prices/:instrument/market", withBroker(broker, instrumentMarketPrice));
}

function aggregatePrices(broker: Broker, req: Request, res: Response): void {
    const serialiser = SER.MAPFUNC(SER.INSTRUMENT, SER.PRICE_AGGREGATE);
    res.respond(200, broker.getAggregatePrices(), serialiser);
}

function instrumentAggregatePrice(broker: Broker, req: Request, res: Response): void {
    const instrument = urlGetInstrument(broker, req, res);
    if (instrument == null) return;

    const iBroker = broker.getIBroker(instrument);
    res.respond(200, iBroker.getAggregatePrices(), SER.PRICE_AGGREGATE);
}

function marketPrices(broker: Broker, req: Request, res: Response): void {
    const serialiser = SER.MAPFUNC(SER.INSTRUMENT, SER.BIG);
    res.respond(200, broker.getMarketPrices(), serialiser)
}

function instrumentMarketPrice(broker: Broker, req: Request, res: Response): void {
    const instrument = urlGetInstrument(broker, req, res);
    if (instrument == null) return;

    const iBroker = broker.getIBroker(instrument);
    res.respond(200, iBroker.getMarketPrice(), SER.BIG)
}