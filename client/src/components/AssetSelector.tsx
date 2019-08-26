import {ELEMENT} from "../state/store/RootStore";
import React, {ChangeEvent} from "react";

interface AssetSelectorProps {
    onValueChange: (newAsset: string) => void,
    assets: Array<string>,
    selectedAsset: string
}

export default class AssetSelector extends React.PureComponent<AssetSelectorProps> {
    constructor(props: AssetSelectorProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render(): ELEMENT {
        return (
            <select className="custom-select" value={this.props.selectedAsset} onChange={this.handleChange}>
                {this.props.assets.map((asset) => <option key={asset}>{asset}</option>)}
            </select>
        )
    }

    handleChange(event: ChangeEvent<HTMLSelectElement>): void {
        const newAsset: string = event.target.value;
        this.props.onValueChange(newAsset);
    }
}