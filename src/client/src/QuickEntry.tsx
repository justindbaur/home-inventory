import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { BaseFormComponent } from './BaseFormComponent';
import { Quantity } from './components/Quantity';
import { HttpClient } from './HttpClient';
import { FormStatus, Item } from './InventoryTypes';

class QuickEntry extends BaseFormComponent<{barcode: string}, Item> {
    load() {
        this.client.get<Item>(`Inventory/items/${this.props.match.params.barcode}`)
            .then(r => {
                if (r.ok) {
                    this.setState({ status: FormStatus.Loaded, payload: r.parsedBody })
                }
                else if (r.status === 404) {
                    // Item does not already exist, create it
                    this.client.post<Item>("Inventory/items", { barcodeNum: this.props.match.params.barcode, quantity: 1, location: "" })
                        .then(r => {
                            if (r.ok) {
                                this.setState({ status: FormStatus.Loaded, payload: r.parsedBody });
                            } else {
                                this.setState({ status: FormStatus.Error, error: new Error("Could not create a new Item") });
                            }
                        })
                        .catch(e => {
                            this.setState({ status: FormStatus.Error, error: e });
                        });
                }
            })
            .catch(e => {
                console.error(e);
                this.setState({ status: FormStatus.Error, error: e });
            });
    }

    handleDelete() {
        this.client.delete(`Inventory/items/${this.state.payload!.barcodeNum}`)
            .then(r => {
                if (r.status === 204) {
                    console.log("Delete was successful");
                    window.location.href = HttpClient.getFullHost() + "/";
                } else {
                    this.setState({status: FormStatus.Error, error: new Error("Could not delete the item")});
                }
            });
    }

    handleSave(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.client.patch<Item>(`Inventory/items/${this.state.payload!.barcodeNum}`,
            {
                name: this.state.payload!.name,
                quantity: this.state.payload!.quantity,
                location: this.state.payload!.location,
                size: this.state.payload!.size,
                uom: this.state.payload!.uom
            })
            .then(r => {
                if (r.ok) {
                    console.log("Saved item!");
                }
                else {
                    console.log(r);
                    r.json().then(r => console.log(r));
                }
            })
            .catch(e => {
                this.setState({ status: FormStatus.Error, error: e });
            });
    }

    componentDidMount() {
        this.load();
    }

    renderForm() {
        return (
            <div>
                <Form.Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Barcode Num:</Form.Label>
                            <Form.Control readOnly disabled name="barcodeNum" value={this.state.payload!.barcodeNum} placeholder="Barcode Num" onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control name="name" placeholder="Name" value={this.state.payload!.name} onChange={this.handleChange} />
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
                            <Form.Control type="text" name="location" value={this.state.payload!.location} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                </Form.Row>
            </div>
        )
    }
}

export default QuickEntry;