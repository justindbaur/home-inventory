import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ErrorAlert } from '../components/ErrorAlert';
import { accountService } from '../services/services.module';

interface LoginForm {
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {

    const [loginForm, setLoginForm] = useState<LoginForm>({
        username: '',
        password: ''
    });

    const [error, setError] = useState<Error | undefined>(undefined);

    const history = useHistory();

    const loginButtonClick = () => {
        accountService.signIn(loginForm.username, loginForm.password)
            .then(r => { 
                history.push('/');
            })
            .catch(err => {
                setError(err);
                console.log(err);
            });
    }
    
    return (
        <Container>
            <ErrorAlert error={error} />
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}></Form.Control>
                </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={loginButtonClick}>
                Login
            </Button>
        </Container>
        
    )
}