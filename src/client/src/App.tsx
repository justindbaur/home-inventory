import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Router } from 'react-router-dom';
import { Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import QuickEntry from './QuickEntry';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class App extends React.Component<any, {value: string}> {
  constructor(props: any) {
    super(props);

    this.state = { value: "" };
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar bg="light">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/inventory">Inventory</Nav.Link>
              </Nav>
              <Form inline onSubmit={this.handleSubmit}>
                <FormControl type="text" placeholder="Quick Entry" className="mr-sm-2" onChange={this.handleOnChange} value={this.state.value} tabIndex={1} />
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Container fluid="md" className="pt-4">
            <Route path="/quickentry/:barcode" component={QuickEntry}/>
          </Container>
        </div>
      </Router>
    );
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({value: e.target.value});

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `http://localhost:3000/quickentry/${this.state.value}`;
  }
}




export default App;
