import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import {urlGetAccount} from "../util/paramaters/url/urlGetAccount";
import Asset from "../../trading/asset";
import Big from "big.js";
import {Map} from "immutable";
import {urlGetAsset} from "../util/paramaters/url/urlGetAsset";
import {bodyGetUnits} from "../util/paramaters/body/bodyGetUnits";
import Account from "../../trading/account";
import SER from "../util/serialisation/SER";
import Instrument from "../../trading/instrument";
import Order from "../../trading/order";
import {respond, respondNoSer} from "../util/serialisation/respond";
import PriceAggregate from "../../brokers/priceAggregate";
import PricePoint from "../../brokers/PricePoint";


export function setupAccountsEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/account/create", withBroker(broker, createAccount));
    app.get("/api/account/:account/state", withBroker(broker, getAccountState));

    app.post("/api/account/:account/assets/:asset/deposit", withBroker(broker, depositAsset));
    app.post("/api/account/:account/assets/:asset/withdraw", withBroker(broker, withdrawAsset));
}

function getAccountState(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if(account == null) return;

    const availableFunds: Map<Asset, Big> = account.getAllAvailableAssets();
    const marketPrices: Map<Instrument, Big> = broker.getMarketPrices();
    const orders: Array<Order> = account.getOrders();

    const aggregateData: Map<Instrument, PriceAggregate> = broker.getAggregatePrices();
    const priceHistory: Map<Instrument, Array<PricePoint>> = broker.getPriceHistory();

    const out = {
        account: SER.ACCOUNT(account),
        funds: SER.MAP(availableFunds, SER.ASSET, SER.BIG),
        prices: SER.MAP(marketPrices, SER.INSTRUMENT, SER.BIG),
        orders: SER.ARRAY(orders, SER.ORDER),
        orderDepth: SER.MAP(aggregateData, SER.INSTRUMENT, SER.PRICE_AGGREGATE),
        priceHistory: SER.MAP(priceHistory, SER.INSTRUMENT, SER.ARRAYFUNC(SER.PRICE_POINT))
    };

    respondNoSer(res, 200, out);
}

function createAccount(broker: Broker, req: Request, res: Response): void {
    const account = new Account();
    respond(res, 200, account, SER.ACCOUNT);
}

function depositAsset(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const asset = urlGetAsset(broker, req, res);
    if (asset == null) return;

    const units = bodyGetUnits(broker, req, res);
    if (units == null) return;
    if (units.lte(0)) {
        const out = `Amount must be positive, was ${units}`;
        return respondNoSer(res, 400, out);
    }

    account.adjustAssets(asset, units);
    return respondNoSer(res, 200, "Successful");
}

function withdrawAsset(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const asset = urlGetAsset(broker, req, res);
    if (asset == null) return;

    const units = bodyGetUnits(broker, req, res);
    if (units == null) return;

    const available = account.getAvailableAssets(asset);
    if (available.lt(units)) {
        respondNoSer(res, 400, "Insufficient Funds");
        return;
    }

    const negative = Big(0).minus(units);
    account.adjustAssets(asset, negative);
    respondNoSer(res, 200, "Successful");
}