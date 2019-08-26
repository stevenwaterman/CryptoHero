import {ELEMENT, FORM_EVENT} from "../state/store/RootStore";
import React from "react";
import {FormControl, InputGroup} from "react-bootstrap";
import {InputGroupAppend, InputGroupText} from "react-bootstrap/InputGroup";

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
            <InputGroupAppend>
                <InputGroupText>{this.props.append}</InputGroupText>
            </InputGroupAppend>
        </InputGroup>
    }

    private handleEdit(event: FORM_EVENT): void {
        const text: string = event.currentTarget.value as string;
        const newValue = Number.parseFloat(text);
        const clean = isFinite(newValue);
        this.props.onTextChange(text);
        if (clean) {
            this.props.onValueChange(newValue);
        }
    }
}