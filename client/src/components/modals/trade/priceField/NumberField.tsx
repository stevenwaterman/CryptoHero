import {ELEMENT} from "../../../../state/store/RootStore";
import React, {ChangeEvent} from "react";
import {formatMoney} from "../../../../util/FormatMoney";

interface NumberFieldProps {
    text: string
    value: number | null,
    step: number,
    append: string,
    onValueChange: (newVal: number) => void,
    onTextChange: (newText: string) => void,
    onDone: () => void
}

export default class NumberField extends React.Component<NumberFieldProps> {
    constructor(props: NumberFieldProps) {
        super(props);

        this.state = {
            text: formatMoney(this.props.value),
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    render(): ELEMENT {
        return <div className="input-group">
            <input className="form-control" id="unitPrice" type="number"
                   disabled={this.props.value == null}
                   step={this.props.step}
                   value={this.props.text}
                   onChange={this.handleEdit}
                   onBlur={this.props.onDone}/>
            <div className="input-group-append">
                <div className="input-group-text">{this.props.append}</div>
            </div>
        </div>
    }

    private handleEdit(event: ChangeEvent<HTMLInputElement>) {
        const text = event.target.value;
        const newValue = Number.parseFloat(text);
        const clean = isFinite(newValue);
        this.props.onTextChange(text);
        if (clean) {
            this.props.onValueChange(newValue);
        }
    }
}