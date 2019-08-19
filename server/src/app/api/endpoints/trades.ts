import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import {withBroker} from "../util/withBroker";
import Broker from "../../brokers/broker";
import {urlGetAccount} from "../util/paramaters/url/urlGetAccount";
import {urlGetTrade} from "../util/paramaters/url/urlGetTrade";

export function setupTradesEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/api/trades/list", withBroker(broker, listTrades));
    app.get("/api/trades/:trade/view", withBroker(broker, viewTrade));
}

function listTrades(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const trades = broker.getTrades(account);

    res.status(200);
    res.json(trades);
}

function viewTrade(broker: Broker, req: Request, res: Response): void {
    const trade = urlGetTrade(broker, req, res);
    if (trade == null) return;

    res.status(200);
    res.json(trade)
}
