import React from "react";
import { Col, Form, FormControl } from "react-bootstrap";
import { BaseFormComponent } from "./BaseFormComponent";
import { Quantity } from "./components/Quantity";
import { FormStatus, Item } from "./InventoryTypes";

export class InventoryItem extends BaseFormComponent<{ barcodeNum: string }, Item> {
    handleSave() {
        this.client.patch<Item>(`Inventory/items/${this.props.match.params.barcodeNum}`, this.state.payload)
            .then(r => this.setState({status: FormStatus.Loaded, payload: r.parsedBody}));
    }

    componentDidMount() {
        this.client.get<Item>(`Inventory/items/${this.props.match.params.barcodeNum}`)
            .then(r => this.setState({status: FormStatus.Loaded, payload: r.parsedBody}));
    }

    handleQuantity(num: number | string | undefined) {
        const tempPayload = this.state.payload!;
        tempPayload.quantity = tempPayload.quantity + +num!;
        this.setState({ status: FormStatus.Loaded , payload: tempPayload });
    }

    renderForm() {
        return (
            <div>
                <Form.Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Barcode Num:</Form.Label>
                            <FormControl readOnly disabled type="text" name="barcodeNum" value={this.state.payload!.barcodeNum} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <FormControl type="text" name="name" value={this.state.payload!.name} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Quantity name="quantity" value={this.state.payload!.quantity} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <FormControl type="text" name="location" value={this.state.payload!.location} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                </Form.Row>
            </div>
        )
    }
}