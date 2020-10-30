import React from "react";
import { BaseListComponent } from "./BaseListComponent";
import { Item } from "./InventoryTypes";



export class InventoryList extends BaseListComponent<Item> {
    constructor(props: {}) {
        super(props);
        this.onRowClick = this.onRowClick.bind(this);
    }

    componentDidMount() {
        this.client.get<Item[]>("Inventory/items")
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

    renderRow(item: Item) {
        return (
            <tr key={item.barcodeNum} onClick={() => this.onRowClick(item.barcodeNum)}>
                <td>{item.name}</td>
                <td>{item.barcodeNum}</td>
                <td>{item.quantity}</td>
            </tr>
        )
    }
}