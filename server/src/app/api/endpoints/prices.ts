import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import {bodyGetInstrument} from "../util/paramaters/body/bodyGetInstrument";
import PriceAggregate from "../../brokers/priceAggregate";

export function setupPriceEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/api/prices/aggregate", withBroker(broker, aggregatePrices));
    app.get("/api/prices/market", withBroker(broker, marketPrices));

    app.get("/api/prices/:instrument/aggregate", withBroker(broker, instrumentAggregatePrice));
    app.get("/api/prices/:instrument/market", withBroker(broker, instrumentMarketPrice));
}

function aggregatePrices(broker: Broker, req: Request, res: Response): void {
    const prices = broker.getAggregatePrices();

    res.status(200);
    res.json(prices);
}

function instrumentAggregatePrice(broker: Broker, req: Request, res: Response): void {
    const instrument = bodyGetInstrument(broker, req, res);
    if (instrument == null) return;

    const iBroker = broker.getIBroker(instrument);
    const prices: PriceAggregate = iBroker.getAggregatePrices();

    res.status(200);
    res.json(prices);
}

function marketPrices(broker: Broker, req: Request, res: Response): void {
    const prices = broker.getMarketPrices();

    res.status(200);
    res.json(prices);
}

function instrumentMarketPrice(broker: Broker, req: Request, res: Response): void {
    const instrument = bodyGetInstrument(broker, req, res);
    if (instrument == null) return;

    const iBroker = broker.getIBroker(instrument);
    const price = iBroker.getMarketPrice();

    res.status(200);
    res.json(price);
}