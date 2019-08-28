import {ELEMENT} from "../modules/RootStore";
import React from "react";
import {FormControl} from "react-bootstrap";

interface AssetSelectorProps {
    onValueChange: (newAsset: string) => void,
    assets: Array<string>,
    selectedAsset: string
}

export default class AssetSelector extends React.PureComponent<AssetSelectorProps> {
    render(): ELEMENT {
        return (
            <FormControl as="select" value={this.props.selectedAsset} onChange={event => {
                const newVal = event.currentTarget.value;
                if (newVal != null)
                    this.props.onValueChange(newVal)
            }}>
                {this.props.assets.map((asset) =>
                    <option value={asset} key={asset}>
                        {asset}
                    </option>
                )}
            </FormControl>
        )
    }
}