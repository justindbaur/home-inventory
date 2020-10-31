import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Quantity } from "./components/Quantity";
import { Constants } from "./Constants";
import { HttpClient } from "./HttpClient";
import { Part, PartTran, User } from "./InventoryTypes";
import { QuickPartEntry } from "./QuickPartEntry";

export const Entry: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);
    const [part, setPart] = useState<Part>({ company: "HOME", id: "", description: "", typeCode: "" });
    const [adjustQuantity, setAdjustQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isCheckIn, setIsCheckIn] = useState(true);


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
        if (e.key === "Enter" || e.key === "Tab") {
            // Search for part
            client.get<Part>(`PartSvc/Parts/(${part.company},${part.id})`)
                .then(r => {
                    if (r.ok) {
                        console.log("Found Existing part");
                        console.log(r.parsedBody);
                        setPart(r.parsedBody!);
                    } else if (r.status === 404) {
                        console.log("No existing part found, showing create screen");
                        setShowModal(true);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    const createPart = (part: Part) => {
        client.post<Part>(`PartSvc/Parts`, part)
            .then(r => {
                if (r.ok) {
                    console.log("Part created.");
                    console.log(part);
                    setPart(part);
                }
            });
        setShowModal(false);
    }

    const handleClose = () => {
        setShowModal(false);
        // 😊

    }

    const toggleMode = () => {
        console.log("Toggling mode");
        const value = isCheckIn ? 1 : -1;
        console.log(value);
        setAdjustQuantity(value);
        setIsCheckIn(!isCheckIn);
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
                        <Form.Control value={part.company} onChange={(e) => setPart({...part, company: e.target.value.toUpperCase()})} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Part Id</Form.Label>
                        <Form.Control value={part.id} onChange={(e) => setPart({ ...part, id: e.target.value })} onKeyDown={partKeyDown} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control readOnly disabled />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Type</Form.Label>
                        <Form.Control readOnly disabled />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label></Form.Label>

                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={part.description} disabled={true} readOnly={true} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Button variant={isCheckIn ? "primary" : "outline-primary"} size="lg" block onClick={toggleMode}>Check In</Button>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Button variant={isCheckIn ? "outline-primary" : "primary"} size="lg" block onClick={toggleMode}>Check Out</Button>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Quantity</Form.Label>
                        <Quantity value={adjustQuantity} onValueChange={(v) => setAdjustQuantity(v)} />
                    </Form.Group>
                </Form.Row>
            </Form>
            <QuickPartEntry show={showModal} part={part} onSave={createPart} onClose={handleClose} />
        </Container>
    )
}