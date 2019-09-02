import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import SER from "../util/serialisation/SER";
import {urlGetInstrument} from "../util/paramaters/url/urlGetInstrument";
import {respond} from "../util/serialisation/respond";

export function setupPriceEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/api/prices/aggregate", withBroker(broker, aggregatePrices));
    app.get("/api/prices/market", withBroker(broker, marketPrices));

    app.get("/api/prices/:instrument/aggregate", withBroker(broker, instrumentAggregatePrice));
    app.get("/api/prices/:instrument/market", withBroker(broker, instrumentMarketPrice));
}

function aggregatePrices(broker: Broker, req: Request, res: Response): void {
    respond(res, 200, broker.getAggregatePrices(), SER.MAPFUNC(SER.INSTRUMENT, SER.PRICE_AGGREGATE));
}

function instrumentAggregatePrice(broker: Broker, req: Request, res: Response): void {
    const instrument = urlGetInstrument(broker, req, res);
    if (instrument == null) return;

    const iBroker = broker.getIBroker(instrument);
    respond(res, 200, iBroker.getAggregatePrices(), SER.PRICE_AGGREGATE);
}

function marketPrices(broker: Broker, req: Request, res: Response): void {
    respond(res, 200, broker.getMarketPrices(), SER.MAPFUNC(SER.INSTRUMENT, SER.BIG))
}

function instrumentMarketPrice(broker: Broker, req: Request, res: Response): void {
    const instrument = urlGetInstrument(broker, req, res);
    if (instrument == null) return;

    const iBroker = broker.getIBroker(instrument);
    respond(res, 200, iBroker.getMarketPrice(), SER.BIG)
}