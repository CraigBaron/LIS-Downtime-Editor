import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { render } from '@testing-library/react';
import {Modal} from 'react-bootstrap';
import './styles.css';
import { Collapse } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';


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
  const handleShow = () => setShow(true);

  const doRootPage = () =>
  {
    window.location.href = '/RootPage'
  }
  const doLogout = async event =>
  {
    localStorage.clear();
    window.location.href = '/LoginPage';
  }
  const doEditPage = async event =>
  {
    window.location.href = '/EditedPage';
  }
  const doMachinePage = async event =>
  {
    window.location.href = '/HomePage';
  }


  

  return (
    <div className={classes.root}>
      <AppBar  position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            LIS-Downtime-Editor
          </Typography>
          { localStorage.getItem("privledge") == 3 ?
          <Button  color="inherit" >      
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon/>
        </Badge>
        </Button>  
        : null}
          { localStorage.getItem("privledge") == 3 ? <Button color="inherit" onClick={doRootPage}>Config</Button> : null}
        
          <Button  color="inherit" onClick={doMachinePage}>Machine Records</Button>
          <Button  color="inherit" onClick={doEditPage}>Edited Records</Button>
          <Button  color="inherit" onClick={handleShow}>Help</Button>
          <Button  color="inherit" onClick={doLogout}>Log Out</Button>
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