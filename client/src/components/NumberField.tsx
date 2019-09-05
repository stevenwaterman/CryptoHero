import {ELEMENT, FORM_EVENT} from "../modules/RootStore";
import React from "react";
import {FormControl, InputGroup} from "react-bootstrap";
import {Big} from "big.js";

interface NumberFieldProps {
    text: string
    value: Big | null,
    step: number,
    append: string,
    onValueChange: (newVal: Big) => void,
    onTextChange: (newText: string) => void,
    onDone: () => void
}

export default class NumberField extends React.Component<NumberFieldProps> {
    constructor(props: NumberFieldProps) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
    }

    render(): ELEMENT {
        return <InputGroup>
            <FormControl type="number"
                         disabled={this.props.value == null}
                         step={this.props.step}
                         value={this.props.text}
                         onChange={this.handleEdit}
                         onBlur={this.props.onDone}/>
            <InputGroup.Append>
                <InputGroup.Text>{this.props.append}</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
    }

    private handleEdit(event: FORM_EVENT): void {
        const text: string = event.currentTarget.value as string;
        this.props.onTextChange(text);
        try {
            const newValue = Big(text);
            this.props.onValueChange(newValue);
        } catch (ignore) {
        }
    }
}