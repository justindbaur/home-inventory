import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Modal } from "react-bootstrap";
import { Constants } from "./Constants";
import { HttpClient } from "./HttpClient";

interface User {
    username: string,
    name: string
}

interface Part {
    id: string,
    description: string
}

export const Entry: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);
    const [company, setCompany] = useState("");
    const [part, setPart] = useState({ id: "", description: "" });
    const [showModal, setShowModal] = useState(false);

    const client = new HttpClient(Constants.ApiUrl);

    useEffect(() => {
        setUsers(
            [
                {
                    username: "jdbaur",
                    name: "Justin Baur"
                },
                {
                    username: "jane",
                    name: "Jane Ouding"
                }
            ]
        );
    }, [setUsers]);

    const partKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void | undefined => {
        if (e.key === "Enter") {
            // Search for part
            client.get<Part>(`PartSvc/Parts/(${company},${part.id})`)
                .then(r => {
                    if (r.ok) {
                        setPart(r.parsedBody!);
                    } else if (r.status === 404) {
                        setShowModal(true);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <Container className="pt-4">
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>User</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." value={user?.username} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUser(users[e.target.selectedIndex])}>
                            {users.map(u => <option key={u.username} value={u.username}>{u.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control value={company} onChange={(e) => setCompany(e.target.value.toUpperCase())} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Part Id</Form.Label>
                        <Form.Control value={part.id} onChange={(e) => setPart({ ...part, id: e.target.value })} onKeyDown={partKeyDown} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={part.description} disabled={true} readOnly={true} />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Part Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="partEntry">
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" value={part.description} onChange={(e) => setPart({ ...part, description: e.target.value })} />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button>
                        Close
                    </Button>
                    <Button>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>


    )
}