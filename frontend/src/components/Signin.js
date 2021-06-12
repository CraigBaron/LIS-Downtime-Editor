import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Modal } from 'react-bootstrap'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import { buildPath } from './config';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Coka-Cola
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));



export default function SignIn() {



  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false);
  const [AOEmail, setAOEmail] = useState(true);
  const [addon, setAddon] = useState(false);
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [resetEmail, setResetEmail] = useState("email");


  const [snack, setSnack] = useState(false);


  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };

  const handleClose = () => 
  {
      setAOEmail(true);
      setAddon(false);
      setShow(false);
  }
  const handleShow = () => setShow(true);
  

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });

    function handlePasswordChange(e) {
      setPassword(e.target.value)
   
    }

    handlePasswordChange(e);

  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }


  const handleResetCodeChange = (e) => {
    setResetCode(e.target.value);
  }
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  }
  const handleNewConfirmPasswordChange = (e) => {
    setNewConfirmPassword(e.target.value);
  }
  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  }

  const Login = async () => {
    await axios.post(buildPath('users/login'), {
      email: email,
      password: password
    })
      .then((response) => {
      
        if (response.data.acessToken) {
          localStorage.setItem('acessToken', response.data.acessToken);
          localStorage.setItem('email', response.data.user.email);
          localStorage.setItem('privledge', response.data.privledge);
          localStorage.setItem('firstName', response.data.firstName);
          localStorage.setItem('lastName', response.data.lastName);
          window.location.href = "/HomePage";
        }
        else {
          setOpen(true);
        }
      }, (error) => {
        console.log(error.request)
      });
  }

  const GetCode = async () => {
    await axios.post(buildPath('users/forgot'), {
      email : resetEmail,
    })
      .then((response) => {
          if(response.data.status === "Fail")
          {

          }
          else
          {
            setAOEmail(false);
            setAddon(true);
            localStorage.setItem('resetEmail', resetEmail);

          }
      }, (error) => {
        console.log(error.request)
      })
      
  }

  const ResetPassword = async () => {
    
    await axios.post(buildPath('resetPassword'), {
      email : resetEmail,
      password : newPassword,
      code : resetCode
    })
      .then((response) => {
        if(response.data.status === "Success")
        {
          localStorage.removeItem('resetEmail');
          handleClose();
          setSnack(true)
        }
      }, (error) => {
        console.log(error.request)
      })
      
  }
  

  return (

    <div className={classes.root}>

      <div>
        <AppBar top="0px" position="relative">
          <Toolbar>
            <Typography variant="h6" align="center" className={classes.title}>
              LIS-Downtime-Editor
        </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Snackbar open={snack} anchorOrigin={{vertical: 'top', horizontal : 'left'}} autoHideDuration={4000} onClose={snackClose}>
        <Alert variant="filled" severity="success">
          Your Password has been changed!
        </Alert>
      </Snackbar>
      
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={handleEmailChange}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                id="password"
                onChange={ handleChange('password')}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    )
                  
                }}
              />
              <Collapse in={open}>
                <br/>
                <Alert variant="outlined" severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Error: Email or password is incorrect
              </Alert>
              </Collapse>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={Login}
              >
                Sign In
          </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={handleShow} variant="body2">
                    Forgot password?
              </Link>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
      

      <Modal id="forgetPasswordModal"show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
              <Collapse in={AOEmail}>
              <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={handleResetEmailChange}
              InputProps={{endAdornment : <Button onClick={GetCode}color="primary" variant="contained">Submit</Button>}}
            />
            </Collapse>
            </div>
            <div>
            <Collapse in={addon}>
            <Alert variant="outlined" severity="success">An email with a reset code has been sent to the adress you provided.</Alert>
            <br></br>
            <div>
            <TextField
              required
              id="outlined-required"
              label="Reset Code"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={handleResetCodeChange}
            />
            </div>
            <br></br>
            <div>
             <TextField
              required
              id="outlined-required"
              label="New Password"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={handleNewPasswordChange}
            />
            </div>
            <br></br>
            <div>
              <TextField
              required
              id="outlined-required"
              label="Confirm New Password"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={handleNewConfirmPasswordChange}
            />
            </div>
            <br></br>
            <Button color="primary" onClick={ResetPassword} variant="contained" fullWidth>Submit</Button>
            </Collapse>
            </div>
       </Modal.Body>
      </Modal>

    </div>

  );
}