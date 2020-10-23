import React from 'react';
import { Alert, Col, Form, Row, Spinner } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { Constants } from './Constants';
import { HttpClient } from './HttpClient';
import { Item } from './serverService';

interface Props {
    barcode: string
}

class QuickEntry extends React.Component<RouteComponentProps<Props>, { status: string, payload: Item | undefined, error: Error | undefined}> {
    http: HttpClient = new HttpClient(Constants.ApiUrl);

    constructor(props: RouteComponentProps<Props>) {
        super(props);
        this.state = { status: 'loading', payload: undefined, error: undefined };
        this.handleChange = this.handleChange.bind(this);
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
                if (r.status === 200) {
                    this.setState({status: 'loaded', payload: r.parsedBody})
                }
                else {
                    this.setState({status: 'loaded', payload: {barcodeNum: this.props.match.params.barcode, name: ''}})
                }
            })
            .catch(e => { 
                console.error(e);
                this.setState({status: 'error', error: e})
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
                    <Form>
                        <Row>
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
                        </Row> 
                    </Form> 
                }
                { this.state.status === 'error' &&
                    <Alert variant="danger">{this.state.error!.message}</Alert>
                }
            </div>
            
        )
    }
}

export default QuickEntry;