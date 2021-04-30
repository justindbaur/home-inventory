import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { ErrorAlert } from "../components/ErrorAlert";
import { Part } from "../InventoryTypes";
import { inventoryService } from "../services/services.module";



export const InventoryList: React.FC = () => {
    const [parts, setParts] = useState<Part[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | undefined>();

    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        inventoryService.getParts()
            .then(d => {
                console.log('Got parts');
                setParts(d);
                setIsLoading(false);
            })
            .catch(err => setError(err));
    }, []);

    const createButtonClicked = () => {
        history.push('/part/new');
    }

    const openButtonClicked = (id: string) => {
        history.push(`/part/${id}`);
    }

    return (
        <>
            <ErrorAlert error={error}></ErrorAlert>
            { isLoading && !error && 
                <Spinner animation="border" />
            }
            { !isLoading &&
                <Table striped bordered hover size="md">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <td align="right">
                                <Button variant="success" onClick={createButtonClicked}>Create</Button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {parts?.map(p => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.description}</td>
                                    <td align="right">
                                        <Button variant="primary" onClick={e => openButtonClicked(p.id)}>Open</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }
        </>
    )
} 