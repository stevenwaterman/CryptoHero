import {ASSETS} from "./asset";

const uuidv4 = require("uuid/v4");

export default class Account {
  id = uuidv4();

  /**
   * The amount left to place on new orders
   */
  availableAssets = {};

  constructor() {
    Object.keys(ASSETS).forEach(asset => {
      this.availableAssets[asset] = 0;
    });
  }

  adjustAssets = (asset, addUnits) =>
    (this.availableAssets[asset.name] += addUnits);

  getAvailableAssets = asset => {
    return this.availableAssets[asset.name];
  };
}
