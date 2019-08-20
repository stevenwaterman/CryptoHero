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
    const prices: Map<Instrument, PriceAggregate> = broker.getAggregatePrices();

    const serialisable = SER.MAP(prices, SER.INSTRUMENT, SER.PRICE_AGGREGATE);
    res.status(200);
    res.json(serialisable);
}

function instrumentAggregatePrice(broker: Broker, req: Request, res: Response): void {
    const instrument = urlGetInstrument(broker, req, res);
    if (instrument == null) return;

    const iBroker = broker.getIBroker(instrument);
    const prices: PriceAggregate = iBroker.getAggregatePrices();

    const serialisable = SER.PRICE_AGGREGATE(prices);
    res.status(200);
    res.json(serialisable);
}

function marketPrices(broker: Broker, req: Request, res: Response): void {
    const prices: Map<Instrument, Big> = broker.getMarketPrices();

    const serialisable = SER.MAP(prices, SER.INSTRUMENT, SER.BIG);
    res.status(200);
    res.json(serialisable);
}

function instrumentMarketPrice(broker: Broker, req: Request, res: Response): void {
    const instrument = urlGetInstrument(broker, req, res);
    if (instrument == null) return;

    const iBroker = broker.getIBroker(instrument);
    const price: Big = iBroker.getMarketPrice();

    const serialisable = {
        "unit price": SER.BIG(price)
    };
    res.status(200);
    res.json(serialisable);
}