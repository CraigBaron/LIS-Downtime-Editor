import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
appBar: {
    top: 'auto',
    bottom: 0,
    height: "50px"
  },
}));

export default function BottomAppBar() {
  
      var naming= localStorage.getItem("firstName");
      var namingL= localStorage.getItem("lastName");
      const classes = useStyles();
      
    return (
<div>
<AppBar position="fixed" color="primary" className={classes.appBar}>
<Toolbar align='center'  >
    <Typography align='center'>
    <h6>User: {naming +" "+  namingL}</h6>
    </Typography>
</Toolbar>
</AppBar>
</div>
    );

}