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


export function setupAccountsEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/account/create", withBroker(broker, createAccount));

    app.get("/api/account/:account/assets/available", withBroker(broker, getAllAvailableAssets));
    app.get("/api/account/:account/assets/:asset/available", withBroker(broker, getOneAvailableAsset));
    app.post("/api/account/:account/assets/:asset/deposit", withBroker(broker, depositAsset));
    app.post("/api/account/:account/assets/:asset/withdraw", withBroker(broker, withdrawAsset));
}

function createAccount(broker: Broker, req: Request, res: Response): void {
    const account = new Account();
    res.respond(200, account, SER.ACCOUNT);
}

function getAllAvailableAssets(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const assets: Map<Asset, Big> = account.getAllAvailableAssets();
    res.respond(200, assets, SER.MAPFUNC(SER.ASSET, SER.BIG));
}

function getOneAvailableAsset(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const asset = urlGetAsset(broker, req, res);
    if (asset == null) return;

    const amount: Big = account.getAvailableAssets(asset);
    res.respond(200, amount, SER.BIG);
}

function depositAsset(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const asset = urlGetAsset(broker, req, res);
    if (asset == null) return;

    const units = bodyGetUnits(broker, req, res);
    if (units == null) return;
    if (units.lte(new Big("0"))) {
        const out = `Amount must be positive, was ${units}`;
        return res.respond(400, out, SER.NO.bind(SER));
    }

    account.adjustAssets(asset, units);
    return res.respond(200, "Successful", SER.NO.bind(SER));
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
        res.status(400);
        res.send("Invalid funds");
        return;
    }

    const negative = new Big("0").minus(units);
    account.adjustAssets(asset, negative);
    res.respond(200, "Successful", SER.NO.bind(SER));
}