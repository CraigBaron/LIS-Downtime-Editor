import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CC from '../CC.jpg'



const useStyles = makeStyles((theme) => ({
appBar: {
    top: 'auto',
    bottom: 0,
    height: "50px",
    zIndex: 3
  },
 logo: {
   width:'100px',
   height: '30px',
   marginBottom:'13px'
 },

 title: {
  flexGrow: 1,
},
 
}));

export default function BottomAppBar() {
  
      var naming= localStorage.getItem("firstName");
      var namingL= localStorage.getItem("lastName");
      const classes = useStyles();

      
    return (
<div>
<AppBar position="fixed" color="primary" className={classes.appBar} >
<Toolbar align='center'  >
    <Typography fontSize="h6.fontSize" align='center'>
    User: {naming +" "+  namingL}
    </Typography>
    <Typography align="right" top="0" className={classes.title} > 
    <img src={CC}  alt="work"  className={classes.logo}/>
    </Typography>
</Toolbar>
</AppBar>
</div>
    );

}