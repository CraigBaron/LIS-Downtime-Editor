import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  const doLogout = async event =>
  {
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
           <Button  color="inherit" onClick={doMachinePage}>Machine Records</Button>
          <Button  color="inherit" onClick={doEditPage}>Edited Records</Button>
          <Button  color="inherit">Help</Button>
          <Button color="inherit" onClick={doLogout}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
