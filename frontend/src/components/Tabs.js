import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Modal} from 'react-bootstrap'
import { DataGrid } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Card, Collapse, Snackbar} from '@material-ui/core';
import axios from 'axios';
import { buildPath } from "./config";
import {useState} from 'react'
import Alert from '@material-ui/lab/Alert';
import {Box} from "@material-ui/core"
import {config} from './config';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'firstName', headerName: 'First name', width: 180 },
  { field: 'lastName', headerName: 'Last name', width: 180 },
  { field: 'privilage', headerName: 'Privilage level', width: 180 },
  
];

const temp = [];
var level='';

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

 
    const [show, setShow] = useState(false);
    const [rows, setRows] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [privilege, setPrivilege] = useState('');
  

  const handleChange = (event) => {
    setPrivilege(event.target.value);
    setselPriviledge(event.target.value);
  }

  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);


  const handleEmailChange = (e) => {setEmail(e.target.value)};
  const handleFirstNameChange = (e) => {setFirstName(e.target.value)};
  const handleLastNameChange = (e) => {setLastName(e.target.value)};
  const handlePasswordChange = (e) => {setPassword(e.target.value)};
  const handleConfirmPasswordChange = (e) => {setConfirmPassword(e.target.value)};

  const[error, setError] = useState("");
  const[displayError, setDisplayError] = useState(false)

  const handleErrorChange = (e) => {setError(e.target.value)};
  const handleDisplayErrorChange = (e) => {setDisplayError(e.target.value)};

  const [selEmail, setselEmail] = useState();
  const [selFirstName, setselFirstName] = useState();
  const [selLastName, setselLastName] = useState();
  const [selPriviledge, setselPriviledge] = useState();

 

  const closeAndAccept = () => {
   
    updateStatusFirstName();
    updateStatusLastName();
    updateStatusPrivledge();
    getEmployees();
    handleClose();
   
}

const closeAndAcceptDelete = () => {
   
 Delete();
  getEmployees();
  handleClose();
 
}


  const EditRecord = (item) =>
  {
    if(selPriviledge==1){
      level='Employee'
    }
    else{
      level='Manager'
    }

      handleShow();
      setselEmail(item.Email);
      setselFirstName(item.firstName);
      setselLastName(item.lastName);
      setselPriviledge(item.privilage);

     

  }


  var getEmployees
  window.onload = getEmployees = async () => {
    try{ 
          const res = await axios.get(buildPath("users/"));
          temp.length = 0;
          for(let i = 0; i < res.data[0].length; i++)
          {
            let user  = {
              "id" : res.data[0][i].ID,
              "Email" : res.data[0][i].Email,
              "firstName": res.data[0][i].FirstName,
              "lastName" : res.data[0][i].LastName,
              "privilage" : res.data[0][i].Privledge
            }
            temp.push(user);          
          }
          setRows(temp);

        }catch(err){
      console.log(err);
      setDisplayError(true)
    }
    }

    const updateStatusFirstName = async () => {
      await axios.post(buildPath('users/editFirstName'), 
      {
      
        email:selEmail,
        firstName:firstName
       
      },config)
        .then((response) => {
          console.log(response.data)
          
        }, (error) => {
          console.log(error.request)
        });
    }
    const updateStatusLastName = async () => {
      await axios.post(buildPath('users/editLastName'), 
      {
      
        email:selEmail,
        lastName:lastName
       
      },config)
        .then((response) => {
          console.log(response.data)
          
        }, (error) => {
          console.log(error.request)
        });
    }
    const updateStatusPrivledge = async () => {
      await axios.post(buildPath('users/editPrivledge'), 
      {
      
        email:selEmail,
        privledge:privilege
       
      },config)
        .then((response) => {
          console.log(response.data)
        
        }, (error) => {
          console.log(error.request)
        });
    }

    const Delete = async () => {
      await axios.post(buildPath('users/delete'), 
      {
      
        email:selEmail
       
       
      },config)
        .then((response) => {
          console.log(response.data)
        
        }, (error) => {
          console.log(error.request)
        });
    }
    
    const signUp = async () => {

          try{
                const res = await axios.post(buildPath("users/signUp"),
                {
                  email : email,
                  password : password,
                  confirmPassword : confirmPassword,
                  firstName : firstName,
                  lastName : lastName,
                  privledge : privilege
                }
                );
                console.log(res.data.errors[0].message)
          }catch(err){
          console.log(err);
          
        }
      }

  return (
  <div>
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Register New Account"/>
        <Tab label="Manage Accounts" />
      </Tabs>
    </Paper>
    <TabPanel value={value} index={0}>
      <Grid container justify="center" >
        <Box border m={5} p={3} borderColor="primary.main" borderRadius="borderRadius" boxShadow={15} width={2/3}>
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
            type="password"            
            onChange={handlePasswordChange}
          />      
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            label="Confirm Password"  
            type="password"        
            onChange={handleConfirmPasswordChange}
          />
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel >Role *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={privilege}
              onChange={handleChange}
             
            >
              <MenuItem value={1}>Employee</MenuItem>
              <MenuItem value={2}>Manager</MenuItem>
            </Select>
          </FormControl>
          <br/><br/>
          <Button fullWidth variant="contained" color="primary" onClick={signUp}>Register</Button>
      </Box>
      </Grid>
    </TabPanel>

    <TabPanel value={value} index={1}>
      <Grid container justify="center" >
        <Box border m={5} p={3} borderColor="primary.main" borderRadius="borderRadius" boxShadow={15} width={1/2}>
          <h5>Registered Accounts</h5>
          <DataGrid autoHeight rows={rows} columns={columns} onRowClick = {item => {EditRecord(item.row)}} rowsPerPageOptions={[5, 10, 20]}/>
        </Box>
      </Grid>
    </TabPanel>
    
    
    <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Account Edit</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <div>
             <TextField
             disabled
              id="Email"
              label="Email"
              defaultValue={selEmail}
              variant="outlined"
              fullWidth
              />
              </div>
              <br/>
              <div>
             <TextField
              id="First Name"
              label="First Name"
              defaultValue={selFirstName}
              variant="outlined"
              fullWidth
              onChange={handleFirstNameChange}
              />
              </div>
              <br/>
              <div>
             <TextField
              id="Last Name"
              label="Last Name"
              defaultValue={selLastName}
              variant="outlined"
              fullWidth
              onChange={handleLastNameChange}
              />
              </div>
              <br/>
            
              { selPriviledge !=3 ?
              <FormControl fullWidth className={classes.formControl}>
            <InputLabel >Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selPriviledge}
              onChange={handleChange}
            >
              <MenuItem value={1}>Employee</MenuItem>
              <MenuItem value={2}>Manager</MenuItem>
            </Select>
          </FormControl>: null
        }
          <br/>
          <br/>
              <div>
              { selPriviledge !=3 ?
              <Button color="primary" variant= "contained" fullWidth onClick={closeAndAcceptDelete}>
                Delete Account
              </Button>
              : null
            }
              </div>
 
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button color="primary" onClick={closeAndAccept}>
      Submit Edit
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}

function TabPanel(props)
{
  const {children, value, index} = props
  return(
    <div>
      {
        value===index && (
          <div>{children}</div>
        )
      }
    </div>
  )
}