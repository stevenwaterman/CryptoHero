import {ELEMENT} from "../../../../state/store/RootStore";
import React, {ChangeEvent} from "react";
import {formatMoney} from "../../../../util/FormatMoney";

interface NumberFieldProps {
    text: string
    value: number,
    step: number,
    append: string,
    onValueChange: (newVal: number) => void,
    onTextChange: (newText: string) => void,
    enable: boolean
}

export default class NumberField extends React.Component<NumberFieldProps>{
    constructor(props: NumberFieldProps) {
        super(props);

        this.state = {
            text: formatMoney(this.props.value),
        };

        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    render(): ELEMENT{
        return <div className="input-group">
            <input className="form-control" id="unitPrice" type="number"
                   disabled={!this.props.enable}
                   step={this.props.step}
                   value={this.props.text}
                   onChange={this.handlePriceChange}/>
            <div className="input-group-append">
                <div className="input-group-text">{this.props.append}</div>
            </div>
        </div>
    }

    private handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
        const text = event.target.value;
        const newValue = Number.parseFloat(text);
        const clean = isFinite(newValue);
        this.props.onTextChange(text);
        if(clean){
            this.props.onValueChange(newValue);
        }
    }
}