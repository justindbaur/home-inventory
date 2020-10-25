import React from 'react';
import { Alert, Button, Col, Form, Spinner } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Constants } from './Constants';
import { HttpClient } from './HttpClient';
import { FormState, FormStatus, Item } from './InventoryTypes';

interface Props {
    barcode: string
}

class QuickEntry extends React.Component<RouteComponentProps<Props>, FormState<Item>> {
    http: HttpClient = new HttpClient(Constants.ApiUrl);

    constructor(props: RouteComponentProps<Props>) {
        super(props);
        this.state = { status: FormStatus.Loading, payload: undefined, error: undefined };
        this.handleChange = this.handleChange.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const tempPayload = this.state.payload;

        // @ts-ignore: Things
        tempPayload[name] = value;

        this.setState({
            payload: tempPayload
        });
    }

    load() {
        this.http.get<Item>(`Inventory/items/${this.props.match.params.barcode}`)
            .then(r => {
                if (r.ok) {
                    this.setState({status: FormStatus.Loaded, payload: r.parsedBody})
                }
                else if (r.status === 404) {
                    // Item does not already exist, create it
                    this.http.post<Item>("Inventory/items", { barcodeNum: this.props.match.params.barcode })
                        .then(r => {
                            if (r.ok) {
                                this.setState({status: FormStatus.Loaded, payload: r.parsedBody })
                            }
                            else {
                                this.setState({status: FormStatus.Error, error: new Error("Could not create a new Item")});
                            }
                        })
                        .catch(e => {
                            this.setState({status: FormStatus.Error, error: e})
                        });
                }
            })
            .catch(e => { 
                console.error(e);
                this.setState({status: FormStatus.Error, error: e})
            });
    }

    saveItem(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.http.patch(`Inventory/items/${this.state.payload!.barcodeNum}`, 
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
                    this.setState({status: FormStatus.Error, error: e});
                });
    }

    componentDidMount() {
        this.load();
    }


    render() {
        return (
            <div>
                { this.state.status === 'loading' && 
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                }
                { this.state.status === 'loaded' && 
                    <Form action='none'>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Barcode Num:</Form.Label>
                                    <Form.Control name="barcodeNum" value={this.state.payload!.barcodeNum} placeholder="Barcode Num" onChange={this.handleChange}/>
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
                                    <Form.Label></Form.Label>
                                    <Form.Control type="number" name="quantity" value={this.state.payload!.quantity} onChange={this.handleChange} />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Button type="submit" onClick={this.saveItem} variant='success'>Save</Button>
                    </Form>
                }
                { this.state.status === FormStatus.Error &&
                    <div>
                        <Alert variant="danger">{this.state.error!.message}</Alert>
                    </div>
                }
            </div>
            
        )
    }
}

export default QuickEntry;