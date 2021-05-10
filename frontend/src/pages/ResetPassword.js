import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
const ResetPassword = () =>
{
    return(
      <div>
          <div>
        <AppBar top="0px" position="relative">
          <Toolbar>
            <Typography variant="h6" align="center" >
              LIS-Downtime-Editor
        </Typography>
          </Toolbar>
        </AppBar>
      </div>
      </div>
    );
};

export default ResetPassword;