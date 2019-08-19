import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import {withBroker} from "../util/withBroker";
import Broker from "../../brokers/broker";
import {getAccount} from "../util/getAccount";
import {getTradeParam} from "../util/getTrade";

export function setupTradesEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/api/trades/list", withBroker(broker, listTrades));
    app.get("/api/trades/:trade/view", withBroker(broker, viewTrade));
}

function listTrades(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;

    const trades = broker.getTrades(account);

    res.status(200);
    res.json(trades);
}

function viewTrade(broker: Broker, req: Request, res: Response): void {
    const trade = getTradeParam(broker, req, res);
    if (trade == null) return;

    res.status(200);
    res.json(trade)
}
