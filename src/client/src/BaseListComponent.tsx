import React from "react";
import { Alert, Spinner, Table } from "react-bootstrap";
import { Constants } from "./Constants";
import { HttpClient } from "./HttpClient";

export interface ListState<T> {
    status: string,
    items?: T[],
    error?: Error
}

export abstract class BaseListComponent<T, P = {}> extends React.Component<P, ListState<T>> {
    constructor(props: P) {
        super(props);
        this.state = { status: 'loading' };
        this.client = new HttpClient(Constants.ApiUrl);
    }

    client: HttpClient;

    abstract renderRow(item: T): JSX.Element;
    abstract renderHead(): JSX.Element;

    navigateTo(address: string) {
        window.location.href = HttpClient.getFullHost() + address;
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
                    <Table striped bordered hover>
                        <thead>
                            {this.renderHead()}
                        </thead>
                        <tbody>
                            {this.state.items!.map(i => this.renderRow(i))}
                        </tbody>
                    </Table>
                }
                { this.state.status === 'error' &&
                    <Alert variant="danger">{this.state.error!.message}</Alert>
                }
            </div>
        )
    }
}