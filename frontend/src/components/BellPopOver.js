import React, { useEffect } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {buildPath, config} from './config';

 export default function BellPopOver(props) {
    console.log("outside")
    useEffect( () => {
      console.log("MOUNTED!!")
      async function fetchData(){
        await axios.get(buildPath('editedRecords/numPending')
        ,config())
            .then((response) => {
               
                setNumRecords(response.data.numRecords)
                console.log(numRecords)
            }, (error) => {
              console.log(error.request)
            })
          }
        fetchData();
    })
    const [numRecords, setNumRecords] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'bellPopover' : undefined;
    
    return(
        <div>
        { localStorage.getItem("privledge") === "3" || localStorage.getItem("privledge") === "2" ?
          <Button color="inherit" onClick={handleClick} id={id}>      
          <Badge badgeContent={numRecords} color="secondary">
            <NotificationsIcon/>
        </Badge>
        </Button>  
        : null} 

    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          <Box padding={2} width={300} height={100}>
            <p>There are currently <b>{numRecords}</b> edited records with the pending approval status<span> </span>
            <a href = "/PendingPage" >
                Click here
            </a>
            <span> </span> to review these records.
            </p>
          </Box>
      </Popover>

        </div>
    )
}

