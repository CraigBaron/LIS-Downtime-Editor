import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Form, Row, Col} from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Card, Collapse} from '@material-ui/core';
import axios from 'axios';
import { buildPath } from "./config";
import {useState} from 'react'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'firstName', headerName: 'First name', width: 180 },
  { field: 'lastName', headerName: 'Last name', width: 180 },
  { field: 'privilage', headerName: 'Privilage level', width: 180 },
  
];
const temp = [];
function  RegisterTable () {

  const classes = useStyles();
  const [privilege, setPrivilege] = useState('');
  const [rows, setRows] = useState([]);

  const handleChange = (event) => {
    setPrivilege(event.target.value);
  }

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleEmailChange = (e) => {setEmail(e.target.value)};
  const handleFirstNameChange = (e) => {setFirstName(e.target.value)};
  const handleLastNameChange = (e) => {setLastName(e.target.value)};
  const handlePasswordChange = (e) => {setPassword(e.target.value)};
  const handleConfirmPasswordChange = (e) => {setConfirmPassword(e.target.value)};

  const[error, setError] = useState("");
  const[displayError, setDisplayError] = useState(false)

  const handleErrorChange = (e) => {setError(e.target.value)};
  const handleDisplayErrorChange = (e) => {setDisplayError(e.target.value)};

  



var getEmployees
window.onload = getEmployees = async () => {
    
   try{ 
        const res = await axios.get(buildPath("users/"));
        temp.length = 0;
        for(let i = 0; i < res.data.length; i++)
        {
           let user  = {
            "id" : res.data[0][i].ID,
            "Email" : res.data[0][i].Email,
            "firstName": res.data[0][i].FirstName,
            "lastName" : res.data[0][i].LastName,
            "privilage" : res.data[0][i].Privledge
           }
          temp.push(user);
          setRows(temp);
          
        }
      }catch(err){
     console.log(err);
   }

  }

  const signUp = async () => {

    if(password === confirmPassword)
    {
        try{
              const res = await axios.post(buildPath("users/signUp"),
              {
                email : email,
                password : password,
                firstName : firstName,
                lastName : lastName,
                privledge : privilege
              }
              );

        }catch(err){
        console.log(err);
      }
    }
    else{
      alert("Passwords Must match");
    }
  }

  
  return (

    
    <div>
    <Form>
  <Row>

    <Col>
    
    <br/>
    <div style={{ height: 400, width: '100%' }}>
      <h5>Registered Accounts</h5>
      <DataGrid autoHeight rows={rows} columns={columns} rowsPerPageOptions={[5, 10, 20]}/>
    </div>
    
    </Col>
    <Col>
    <br/>
    <Container  maxWidth="md">
    <Card>
    <br/>
    <h5> Register New Account</h5>
      <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="First Name"
                name="email"
                autoComplete="email"
                onChange={handleFirstNameChange}
                />
                    
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Last Name"
                autoComplete="email"
                onChange={handleLastNameChange}
                />
              
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Email Address"             
                autoComplete="email"
                onChange={handleEmailChange}
                />
                
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Password"               
                autoComplete="email"
                onChange={handlePasswordChange}
                />
              
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Confirm Password"          
                autoComplete="email"
                onChange={handleConfirmPasswordChange}
                />
                
                  
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Privledge *</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={privilege}
                  onChange={handleChange}
                  label="Privledge"
                >
                  <MenuItem value={1}>Employee</MenuItem>
                  <MenuItem value={2}>Manager</MenuItem>
                  
                </Select>
              </FormControl>
              <Collapse in={displayError}>
                  <Alert variant="outlined" severity="error">
                      {error}
                  </Alert>
              </Collapse>
              <br/>
              <br/>
              <Button fullWidth variant="contained" color="primary" onClick={signUp}>Register</Button>
              <br/>
              </Card>
        </Container>
        
    </Col>
  </Row>
</Form>
</div>



   
  );
}
export default RegisterTable;

