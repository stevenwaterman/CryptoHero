import BitcoinExchangeServer from "../../../app/api/bitcoinExchangeServer";

export class G {
    static readonly PORT = 3000;
    static readonly API = `http://localhost:${G.PORT}/api/`;
    static readonly SERVER = new BitcoinExchangeServer();
    static readonly BROKER = G.SERVER.broker;
}