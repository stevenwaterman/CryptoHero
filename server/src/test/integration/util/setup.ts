import BitcoinExchangeServer from "../../../app/api/bitcoinExchangeServer";
import {REGISTRY} from "../../../app/registry";
import Broker from "../../../app/brokers/broker";

export let server: BitcoinExchangeServer;
export let broker: Broker;

export function setup(): void {
    beforeAll(() => {
        server = new BitcoinExchangeServer();
        broker = new Broker();
        server.launch(3000);
    });

    beforeEach(() => {
        REGISTRY.clear();
        broker.clear();
    });

    afterAll(() => {
        server.shutdown();
    });
}

export const PORT = 3000;
export const API = `http://localhost:${PORT}/api/`;