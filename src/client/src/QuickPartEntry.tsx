import React, { useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { Part } from './InventoryTypes';

interface QuickPartEntryProps {
    part: Part;
    show: boolean;
    onSave: (part: Part) => void | undefined;
    onClose: () => void | undefined;
}

export const QuickPartEntry: React.FC<QuickPartEntryProps> = ({part, show, onSave, onClose}) => {

    const [statePart, setStatePart] = useState(part);


    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Part Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="partEntry">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatePart({...statePart, typeCode: e.target.value})}>
                                <option value="RW">Raw</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={statePart.description} onChange={(e) => setStatePart({...statePart, description: e.target.value})} />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={() => onSave(statePart)}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}