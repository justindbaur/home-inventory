import React from "react";
import { Col, Form, FormControl } from "react-bootstrap";
import { BaseFormComponent } from "./BaseFormComponent";
import { Quantity } from "./components/Quantity";
import { HttpClient } from "./HttpClient";
import { FormStatus, Item } from "./InventoryTypes";

export class InventoryItem extends BaseFormComponent<{ barcodeNum: string }, Item> {
    handleSave() {
        this.client.patch<Item>(`Inventory/items/${this.props.match.params.barcodeNum}`, this.state.payload)
            .then(r => this.setState({status: FormStatus.Loaded, payload: r.parsedBody}));
    }

    handleDelete() {
        this.client.delete(`Inventory/items/${this.props.match.params.barcodeNum}`)
            .then(r =>{ 
                if (r.status === 204) {
                    window.location.href = HttpClient.getFullHost() + "/Inventory";
                } else {
                    this.setState({ status: FormStatus.Error, error: new Error("Delete failed")});
                }
            })
            .catch(e => this.setState({ status: FormStatus.Error, error: e}));
    }

    componentDidMount() {
        this.client.get<Item>(`Inventory/items/${this.props.match.params.barcodeNum}`)
            .then(r => this.setState({status: FormStatus.Loaded, payload: r.parsedBody}));
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
                            <Quantity value={this.state.payload!.quantity} onValueChange={v => this.updatePayload("quantity", v)} />
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