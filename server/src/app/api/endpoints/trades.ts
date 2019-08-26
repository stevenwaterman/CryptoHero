import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import {withBroker} from "../util/withBroker";
import Broker from "../../brokers/broker";
import {urlGetAccount} from "../util/paramaters/url/urlGetAccount";
import {urlGetTrade} from "../util/paramaters/url/urlGetTrade";
import Instrument from "../../trading/instrument";
import Trade from "../../trading/trade";
import {Map} from "immutable";
import SER from "../util/serialisation/SER"

export function setupTradesEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/api/trades/list/account/:account", withBroker(broker, listTrades));
    app.get("/api/trades/:tradeModal/view", withBroker(broker, viewTrade));
}

function listTrades(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const trades: Map<Instrument, Array<Trade>> = broker.getTrades(account);
    const serialisable = SER.MAP(trades, SER.INSTRUMENT, SER.ARRAYFUNC(SER.TRADE));

    res.status(200);
    res.json(serialisable);
}

function viewTrade(broker: Broker, req: Request, res: Response): void {
    const trade = urlGetTrade(broker, req, res);
    if (trade == null) return;

    const serialisable = SER.TRADE(trade);
    res.status(200);
    res.json(serialisable)
}
