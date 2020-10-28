import React from "react";
import { Alert, Button, ButtonGroup, Container, Form, Spinner } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { Constants } from "./Constants";
import { HttpClient } from "./HttpClient";
import { FormState, FormStatus } from "./InventoryTypes";

export abstract class BaseFormComponent<P, T> extends React.Component<RouteComponentProps<P>, FormState<T>> {
    constructor(props: RouteComponentProps<P>) {
        super(props);
        this.state = { status: FormStatus.Loading };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.client = new HttpClient(Constants.ApiUrl);
    }

    protected client: HttpClient;

    protected handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const tempPayload = this.state.payload;

        // @ts-ignore: I have to do it this way for now.
        tempPayload[name] = value;

        this.setState({
            payload: tempPayload
        });
    }

    handleSave(event: React.MouseEvent<HTMLElement>): void | undefined {
        console.log("Save request received.");
    }

    handleDelete(event: React.MouseEvent<HTMLElement>): void | undefined {
        console.log("Delete request received.");
    }

    render() {
        return (
            <div>
                { this.state.status === FormStatus.Loading &&
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                }
                { this.state.status === FormStatus.Loaded &&
                    <Container className="pt-4" fluid="md">
                        <Form>
                            <Form.Row>
                                <ButtonGroup className="mr-2">
                                    <Button variant="success" onClick={this.handleSave}>Save</Button>
                                    <Button variant="danger">Delete</Button>
                                </ButtonGroup>
                                <br />
                            </Form.Row>
                            {this.renderForm()}
                        </Form>
                    </Container>
                }
                { this.state.status === FormStatus.Error &&
                    <div>
                        <Alert variant="danger">
                            <Alert.Heading>Oh no, there was an error!</Alert.Heading>
                            <p>{this.state.error!.message}</p>
                        </Alert>
                    </div>
                }
            </div>
        )
    }

    abstract renderForm(): JSX.Element;
}