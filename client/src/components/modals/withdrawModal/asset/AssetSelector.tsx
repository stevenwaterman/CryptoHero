import {ELEMENT} from "../../../../state/store/RootStore";
import React from "react";
import {AssetSelectorProps} from "./AssetSelectorContainer";

export default class AssetSelector extends React.PureComponent<AssetSelectorProps> {
    render(): ELEMENT {
        return (
            <select className="custom-select">
                {this.props.assets.map((asset) => <option selected={asset === this.props.selected}>{asset}</option>)}
            </select>
        )
    }
}