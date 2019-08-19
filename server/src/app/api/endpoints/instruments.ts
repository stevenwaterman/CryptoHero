import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import Instrument from "../../trading/instrument";

export function setupInstrumentEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;
    app.get("/api/instruments/list", withBroker(broker, listInstruments));
}

function listInstruments(broker: Broker, req: Request, res: Response): void {
    const names = Instrument.NAMES;

    res.status(200);
    res.json(names);
}
