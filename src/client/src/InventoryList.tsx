import React from "react";
import { BaseListComponent } from "./BaseListComponent";
import { Part } from "./InventoryTypes";



export class InventoryList extends BaseListComponent<Part> {
    constructor(props: {}) {
        super(props);
        this.onRowClick = this.onRowClick.bind(this);
    }

    componentDidMount() {
        this.client.get<Part[]>("PartSvc/parts")
            .then(r => {
                console.log(r);
                if (r.ok) {
                    this.setState({status: 'loaded', items: r.parsedBody});
                } else {
                    this.setState({status: 'error', error: new Error('Could not load items')});
                }
        })
        .catch(e => this.setState({status: 'error', error: e}));
    }

    renderHead() {
        return (
            <tr>
                <th>Name</th>
                <th>Barcode Num</th>
                <th>Quantity</th>
            </tr>
        )
    }

    onRowClick(key: string) {
        this.navigateTo(`/inventory/${key}`);
    }

    renderRow(part: Part) {
        return (
            <tr key={part.id} onClick={() => this.onRowClick(part.id)}>
                <td>{part.description}</td>
                <td>{part.id}</td>
            </tr>
        )
    }
}