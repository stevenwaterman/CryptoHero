import {ELEMENT} from "../state/store/RootStore";
import React from "react";
import {FormControl} from "react-bootstrap";

interface AssetSelectorProps {
    onValueChange: (newAsset: string) => void,
    assets: Array<string>,
    selectedAsset: string
}

export default class AssetSelector extends React.PureComponent<AssetSelectorProps> {
    private lastSelection: string = "";

    render(): ELEMENT {
        return (
            <FormControl as="select" value={this.props.selectedAsset} inputRef={this.props.onValueChange}>
                {this.props.assets.map((asset) =>
                    <option value={asset} key={asset}>
                        {asset}
                    </option>
                )}
            </FormControl>
        )
    }
}