import {ASSETS} from "./asset";
import {Big} from "big.js";

const uuidv4 = require("uuid/v4");

export default class Account {
  id = uuidv4();

  /**
   * The amount left to place on new orders
   */
  availableAssets = {};

  constructor() {
    Object.keys(ASSETS).forEach(asset => {
      this.availableAssets[asset] = new Big("0");
    });
  }

  adjustAssets = (asset, addUnits) =>
    (this.availableAssets[asset.name] = this.availableAssets[asset.name].plus(addUnits));

  getAvailableAssets = asset => {
    return this.availableAssets[asset.name];
  };
}
