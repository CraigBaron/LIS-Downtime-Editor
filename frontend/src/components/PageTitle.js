import React from 'react';
import ReactDOM from 'react-dom'
import {Form, Col, Button, Container,Navbar} from 'react-bootstrap'

function PageTitle(){

const reLocate = async event =>
{
  window.location.href = '/HomePage';
}
  return(
<div>
  <h3>LIS Downtime Editor</h3>
<Col>
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" onClick={reLocate}>
    Submit
  </Button>
</Form>
</Col>
</div>
  );
};
export default PageTitle;