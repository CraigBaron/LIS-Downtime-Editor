import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Form, Row, Col} from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';




const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Email', headerName: 'Email', width: 130 },
  { field: 'Password', headerName: 'Password', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'Privilage', headerName: 'Privilage level', width: 130 },
  
];
function RegisterTable() {

const rows = [
  {id: 1,Email: 'Craig@gmail.com', Password: 'password0',lastName: 'Barron', firstName: 'Craig', Privilage: 3 },
  {id: 2, Email: 'Jesse@gmail.com', Password: 'password1',lastName: 'Chelhal', firstName: 'Jesse',Privilage: 2  },
  {id: 3, Email: 'Rebecca@gmail.com', Password: 'password2',lastName: 'Kizelewicz', firstName: 'Rebecca',Privilage: 2 },
  {id: 4, Email: 'Shane@gmail.com', Password: 'password3',lastName: 'Desilva', firstName: 'Shane',Privilage: 1},
  {id: 5, Email: 'Jacob@gmail.com', Password: 'password4',lastName: 'Reed', firstName: 'Jacob',Privilage: 1},
  {id: 6, Email: 'Edward@gmail.com', Password: 'password5',lastName: 'Amoruso', firstName: 'Edwrd',Privilage: 1 },
  {id: 7, Email: 'Manny@gmail.com', Password: 'password6',lastName: 'Gotay', firstName: 'Manny',Privilage: 2 },
  {id: 8, Email: 'Mark@gmail.com', Password: 'password7', lastName: 'Heinrich', firstName: 'Mark' ,Privilage: 1 },
  {id: 9, Email: 'Richard@gmail.com', Password: 'password8', lastName: 'Leinecker', firstName: 'Richard',Privilage: 2 },
];


  return (

    
    <div>
    <Form>
  <Row>
    <Col>
    <br/>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid autoHeight rows={rows} columns={columns} pageSize={7}/>
    </div>
    </Col>
    <Col>
    <br/>
    <h5> &emsp; Registration form</h5>
    <Container  maxWidth="md">
      <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="First Name"
                name="email"
                autoComplete="email"/>
                    
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Last Name"
                
                autoComplete="email"/>
              
      <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Email Address"
              
                autoComplete="email"></TextField>
                  
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Password"
               
                autoComplete="email"/>
              
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Confirm Password"
             
                autoComplete="email"/>
                
                  
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Privliage Level"
             
                autoComplete="email"/>
                  <br/>
                  <br/>
                  <Button
                fullWidth
                variant="contained"
                color="primary"
                
              >
               Register
          </Button>
        </Container>
    </Col>
  </Row>
</Form>
</div>



   
  );
}export default RegisterTable;

