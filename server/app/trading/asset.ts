import { Set, Map } from "immutable";

export default class Asset {
  readonly name: string;

  private constructor(name: String) {
    if (name == null) throw "Name must be defined and not null";
    this.name = name.toUpperCase();
  }

  static readonly GBP = new Asset("GBP");
  static readonly BTC = new Asset("BTC");
  static readonly LTC = new Asset("LTC");

  static readonly ALL: Set<Asset> = Set([Asset.GBP, Asset.BTC, Asset.LTC]);
  static readonly MAP: Map<Asset, Asset> = Asset.ALL.toMap();
}
