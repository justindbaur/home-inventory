import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

interface QuantityProps {
    value: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined,
    name: string
}

export class Quantity extends React.Component<QuantityProps, { inputValue: number }> {
    constructor(props: QuantityProps) {
        super(props);
        this.state = { inputValue: this.props.value };
        this.formRef = React.createRef();
    }

    formRef: React.RefObject<HTMLInputElement>

    render() {
        return (
            <InputGroup>
                <InputGroup.Prepend>
                    <Button variant="outline-secondary" onClick={() => this.change(-1)}>-</Button>
                </InputGroup.Prepend>
                <Form.Control ref={this.formRef} type="number" name={this.props.name} value={this.state.inputValue} onChange={this.handleChange} />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => this.change(1)}>+</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(this);
        console.log(e);
        this.setState({ inputValue: +e.target.value });
        this.props.onChange(e);
    }

    // https://stackoverflow.com/questions/42550341/react-trigger-onchange-if-input-value-is-changing-by-state/42554283
    change(num: number) {
        this.setNativeValue(num);
        this.setState({ inputValue: this.state.inputValue + num });
        this.formRef.current!.dispatchEvent(new Event('input', { bubbles: true }));
    }

    setNativeValue(value: number) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        console.log(nativeInputValueSetter);
        nativeInputValueSetter?.call(this, this.state.inputValue + value);

        const event = new Event('input', { bubbles: true });
        this.formRef.current!.dispatchEvent(event);
    }

    addToInput = (valueToAdd: number) => {

    }
}