import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Modal} from 'react-bootstrap'
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { buildPath, refreshToken, config } from "./config";
import {useState} from 'react'
import {Box} from "@material-ui/core"
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'FirstName', headerName: 'First name', width: 180 },
  { field: 'LastName', headerName: 'Last name', width: 180 },
  { field: 'Privledge', headerName: 'Role', width: 180 },
];


var level='';

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  //hooks for rows and show for modal
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState([]);
  //functions to handle the state of modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //function to handle tab changes
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  //function to handle role change on signup form dropdown
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  }
  //hooks for signup form
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  //functions to handle state changes of signup form
  const handleEmailChange = (e) => {setEmail(e.target.value)};
  const handleFirstNameChange = (e) => {setFirstName(e.target.value)};
  const handleLastNameChange = (e) => {setLastName(e.target.value)};
  const handlePasswordChange = (e) => {setPassword(e.target.value)};
  const handleConfirmPasswordChange = (e) => {setConfirmPassword(e.target.value)};

  //hooks for users modal
  const [selEmail, setSelEmail] = useState("");
  const [selFirstName, setSelFirstName] = useState("");
  const [selLastName, setSelLastName] = useState("");
  const [selRole, setSelRole] = useState(0);
  const [selID, setSelID] = useState(0);
  //functions to handle state changes of users modal form
  const handleSelFirstNameChange = (e) => {setSelFirstName(e.target.value)};
  const handleSelLastNameChange = (e) => {setSelLastName(e.target.value)};
  const handleSelRoleChange = (e) => {setSelRole(e.target.value)};
  const handleSelIDChange = (e) => {setSelID(e.target.value)};
  
  const [snackMsg, setSnackMsg] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSnackClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  //function to set the selection hooks to the active user clicked
  const EditRecord = (item) =>
  {
    if(selRole==1){
      level='Employee'
    }
    else{
      level='Manager'
    }
      handleShow();
      setSelEmail(item.Email);
      setSelFirstName(item.FirstName);
      setSelLastName(item.LastName);
      setSelRole(item.Privledge);
      setSelID(item.id);
  }


  const getEmployees = async () => {
    
    await axios.post(buildPath("users/"),
    {
      refreshToken : refreshToken()
    },config())
      .then((response) => {

        if(response.data.accessToken){
          localStorage.setItem('accessToken', response.data.accessToken)  
        }
        setRows(response.data)
      
      }, (err) => {
        console.log(err)
      });
     
    }

    const updateUser = async () => {
      await axios.post(buildPath('users/editUser'), 
      {
        firstName: selFirstName,
        lastName: selLastName,
        role:  selRole,
        ID: selID
      },config())
        .then((response) => {
          if(response.data.accessToken){
            localStorage.setItem('accessToken', response.data.accessToken)  
          }
          if(response.data.status)
          {
            getEmployees()
            handleClose()
            setSnackMsg(response.data.status)
            handleSnackClick()
          }
        }, (err) => {
          console.log(err)
        });

    }
   
    const Delete = async () => {
      await axios.post(buildPath('users/delete'), 
      {     
        email:selEmail         
      },config())
        .then((response) => {
          if(response.data.accessToken){
            localStorage.setItem('accessToken', response.data.accessToken)  
          }
          if(response.data.status)
          {
            getEmployees()
            handleClose()
            setSnackMsg(response.data.status)
            handleSnackClick()
          }
        
        }, (error) => {
          console.log(error.request)
        });
    }
    
    const signUp = async () => {

        await axios.post(buildPath("users/signUp"),
        {
          email : email,
          password : password,
          confirmPassword : confirmPassword,
          firstName : firstName,
          lastName : lastName,
          privledge : role
        },config())
        .then((response) => {
        if(response.data.accessToken){
          localStorage.setItem('accessToken', response.data.accessToken)  
        }    
        setSnackMsg(response.data.status);
        handleSnackClick(); 
      }, (error) => {
        console.log(error.request)
      });
    }
  return (
  <div>
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="info" variant="filled">
          {snackMsg}
        </Alert>
    </Snackbar>

    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Register New Account"/>
        <Tab label="Manage Accounts" onClick={getEmployees}/>
      </Tabs>
    </Paper>
    <TabPanel value={value} index={0}>
      <Grid container justify="center" >
        <Box  m={5} p={3} borderColor="primary.main" borderRadius="borderRadius" boxShadow={15} width="80%" maxWidth="500px">
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
              value={role}
              onChange={handleRoleChange}
  
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
        <Box  m={5} p={3} borderColor="primary.main" borderRadius="borderRadius" boxShadow={15} width="80%" maxWidth="900px">
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
              label="Email"
              value={selEmail}
              variant="outlined"
              fullWidth
              />
              </div>
              <br/>
              <div>
             <TextField
              label="First Name"
              value={selFirstName}
              variant="outlined"
              fullWidth
              onChange={handleSelFirstNameChange}
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
              onChange={handleSelLastNameChange}
              />
              </div>
              <br/>
            
              { selRole !=3 ?
              <FormControl variant="outlined" fullWidth>
            <InputLabel >Role</InputLabel>
            <Select
              label="Role"
              value={selRole}
              onChange={handleSelRoleChange}
            >
              <MenuItem value={1}>Employee</MenuItem>
              <MenuItem value={2}>Manager</MenuItem>
            </Select>
          </FormControl>: null
        }
          <br/>
          <br/>
              <div>
              { selRole !=3 ?
              
              <Button color="secondary" variant= "contained" onClick={Delete} >
                Delete Account
                <WarningIcon />
              </Button>
              : null
            }
              </div>
 
   </Modal.Body>
   <Modal.Footer>
    <Button onClick={handleClose}>
      Cancel
    </Button>
    <Button color="primary"  onClick={updateUser}>
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

//Styled(MuiBox)