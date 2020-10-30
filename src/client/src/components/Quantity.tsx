import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

interface QuantityProps {
    value: number,
    onValueChange: (value: number) => void | undefined
}

export class Quantity extends React.Component<QuantityProps, { value: number }> {
    constructor(props: QuantityProps) {
        super(props);
        this.state = { value: this.props.value };
    }

    render() {
        return (
            <InputGroup>
                <InputGroup.Prepend>
                    <Button variant="outline-secondary" onClick={() => this.addToInput(-1)}>-</Button>
                </InputGroup.Prepend>
                <Form.Control type="number" value={this.state.value} onChange={e => this.updateValue(+e.target.value)} />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => this.addToInput(1)}>+</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    addToInput(num: number) {
        const newValue = this.state.value + num;
        this.updateValue(newValue);
    }

    updateValue(newNum: number) {
        this.setState({ value: newNum });
        this.props.onValueChange(newNum);
    }
}