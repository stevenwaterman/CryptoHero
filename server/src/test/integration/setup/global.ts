import BitcoinExchangeServer from "../../../app/api/bitcoinExchangeServer";
import {REGISTRY} from "../../../app/registry";

export class G {
    static readonly PORT = 3000;
    static readonly API = `http://localhost:${G.PORT}/api/`;
    static readonly SERVER = new BitcoinExchangeServer();
    static readonly BROKER = G.SERVER.broker;
}

export function setup(): void {
    resetBeforeEach();
    resetAfterEach();
}

export function resetBeforeEach(): void {
    beforeEach(() => {
        REGISTRY.clear();
        G.BROKER.clear();
        G.SERVER.launch(G.PORT);
    });
}

export function resetAfterEach(): void {
    afterEach(() => {
        G.SERVER.shutdown();
    });
}
