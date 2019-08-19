import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import {getAccount} from "../util/getAccount";
import Asset from "../../trading/asset";
import Big from "big.js";
import {Map} from "immutable";
import {getAssetParam} from "../util/getAsset";
import {getUnits} from "../util/getUnits";
import Account from "../../trading/account";


export function setupAccountsEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/account/create", withBroker(broker, createAccount));

    app.get("/api/account/assets/available", withBroker(broker, getAvailableAssets));
    app.get("/api/account/assets/total", withBroker(broker, getTotalAssets));

    app.get("/api/account/assets/:asset/available", withBroker(broker, assetGetAvailable));
    app.get("/api/account/assets/:asset/total", withBroker(broker, assetGetTotal));
    app.post("/api/account/assets/:asset/deposit", withBroker(broker, assetDeposit));
    app.post("/api/account/assets/:asset/withdraw", withBroker(broker, assetWithdraw));
}

function getAvailableAssets(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;
    const assets = account.getAllAvailableAssets();

    res.status(200);
    res.json(assets);
}

function createAccount(broker: Broker, req: Request, res: Response): void {
    const account = new Account();

    const out = {
        "account": account.id
    };
    res.status(200);
    res.json(out);
}

function getTotalAssets(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;
    const available: Map<Asset, Big> = account.getAllAvailableAssets();
    const locked: Map<Asset, Big> = broker.getLockedAssets(account);
    const total = available.mergeWith((oldVal, newVal) => oldVal.plus(newVal), locked);

    res.status(200);
    res.json(total);
}

function assetGetAvailable(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;

    const asset = getAssetParam(broker, req, res);
    if (asset == null) return;

    const amount = account.getAvailableAssets(asset);

    res.status(200);
    res.json(amount);
}

function assetGetTotal(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;

    const asset = getAssetParam(broker, req, res);
    if (asset == null) return;

    const available = account.getAvailableAssets(asset);
    const lockedAssets: Map<Asset, Big> = broker.getLockedAssets(account);
    const locked = <Big>lockedAssets.get(asset);
    const total = available.plus(locked);

    res.status(200);
    res.json(total);
}

function assetDeposit(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;

    const asset = getAssetParam(broker, req, res);
    if (asset == null) return;

    const units = getUnits(broker, req, res);
    if (units == null) return;
    if (units.lte(new Big("0"))) {
        res.status(400);
        res.send(`Amount must be positive, was ${units}`);
        return;
    }

    account.adjustAssets(asset, units);

    res.status(200);
    res.send("Successful");
}

function assetWithdraw(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;

    const asset = getAssetParam(broker, req, res);
    if (asset == null) return;

    const units = getUnits(broker, req, res);
    if (units == null) return;
    if (units.lte(new Big("0"))) {
        res.status(400);
        res.send(`Amount must be positive, was ${units}`);
        return;
    }

    const available = account.getAvailableAssets(asset);
    if (available.lt(units)) {
        res.status(400);
        res.send("Invalid funds");
        return;
    }

    const adjustment = new Big("0").minus(units);
    account.adjustAssets(asset, adjustment);

    res.status(200);
    res.send("Successful");
}