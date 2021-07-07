import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Modal} from 'react-bootstrap';
import './styles.css';
import BellPopOver from './BellPopOver';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {config, buildPath, refreshToken} from './config';
import axios from 'axios';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function ButtonAppBar() {

  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    handleMenuClose()
  }

  const doRootPage = () =>
  {
    window.location.href = '/RootPage'
  }
  const doLogout = async () =>
  {
    await axios.post(buildPath('users/logout'), {
      refreshToken : refreshToken
    },config)
      .then((response) => {
        
      }, (error) => {
        console.log(error.request)
      })
      
    localStorage.clear();
    window.location.href = '/LoginPage';
  }
  const doEditPage = async event =>
  {
    window.location.href = '/EditedPage';
  }
  const doPendingPage = async event =>
  {
    window.location.href = '/PendingPage';
  }
  const doMachinePage = async event =>
  {
    window.location.href = '/HomePage';
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleClick}>
      <MenuIcon />
    </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          { localStorage.getItem("privledge") == 3 ? <div><MenuItem onClick={doRootPage}>Settings</MenuItem> <Divider></Divider></div>: null}

          <MenuItem onClick={doMachinePage}>Machine Records</MenuItem>
          <Divider></Divider>
          <MenuItem onClick={doEditPage}>Edited Records</MenuItem>
          <Divider></Divider>
          <MenuItem onClick={handleShow}>Help</MenuItem>
          
        </Menu>
        
          <Typography variant="h6" className={classes.title}>
            LIS-Downtime-Editor
          </Typography>
       
          <BellPopOver/>

          <IconButton edge="start" color="inherit" onClick={doLogout}>
            <MeetingRoomIcon/>
          </IconButton>
          
        
        </Toolbar>
      </AppBar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Read Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>To select and edit a record click on the row that contains the record.</p>
        <p>Click on a column header to sort records by the column's attribute. Click on the arrow to sort the records in order (click down arrow) or in reverse order (click up arrow). </p>  
        <p> Hover over a column header and click on the three vertical dots to go to the Filter option where you can filter records based on the value of the attribute you are looking for.</p>   </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="primary"  onClick={handleClose}>
          Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}