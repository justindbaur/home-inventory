import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

interface QuantityProps {
    value: number,
    onValueChange: (value: number) => void | undefined
}

export const Quantity: React.FC<QuantityProps> = ({ value, onValueChange }) => {

    const addToInput = (num: number) => {
        updateValue(0);
    }

    const updateValue = (newNum: number) => {
        onValueChange(newNum);
    }

    return (
        <InputGroup>
            <InputGroup.Prepend>
                <Button variant="outline-secondary" onClick={() => addToInput(-1)}>-</Button>
            </InputGroup.Prepend>
            <Form.Control type="number" value={value} onChange={e => updateValue(+e.target.value)} />
            <InputGroup.Append>
                <Button variant="outline-secondary" onClick={() => addToInput(1)}>+</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}