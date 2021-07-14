import * as React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {Button, Menu} from '@material-ui/core'
import {useState} from 'react'
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import {Box} from "@material-ui/core"
import {Modal} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { buildPath, config } from "./config";
import Typograghy from '@material-ui/core/Typography'
import {Grid} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TableChartIcon from '@material-ui/icons/TableChart';
import Select from '@material-ui/core/Select';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  grid: {
    border: 0,
    color:
      theme.palette.type === 'light'
        ? 'rgba(0,0,0,.85)'
        : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.type === 'light'
          ? 'rgba(0,0,0,.85)'
          : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    
  },
}));

var temp;
var i;


const columns = [
    { field: 'id', headerName: 'UniqueID', width: 150 },
    { field: 'LineID', headerName: 'LineID', width: 130 },
    { field: 'Machine', headerName: 'Machine', width: 200 },
    { field: 'ComponentID', headerName: 'ComponentID', width: 200 },
    { field: 'StartDateTime', headerName: 'StartDateTime', width: 250 },
    { field: 'EndDateTime', headerName: 'EndDateTime', width: 250 },
    { field: 'Comments', headerName: 'Comments', width: 130 },
    { field: 'DurationTotalMinutes', headerName: 'Duration', width: 130 },
    { field: 'Secondarypk', headerName: 'Secondarypk', width: 130 },
    { field: 'Reason', headerName: 'Reason', width: 130 },
    { field: 'Status', headerName: 'Status', width: 130 },
    
  ];

function EditedTable() {

  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [rows, setrows] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selID, setselID] = useState("");
  const [selLineID, setselLineID] = useState("");
  const [selMachineID, setselMachineID] = useState("");
  const [selComponentID, setselComponentID] = useState("");
  const [selStartTime, setselStartTime] = useState("");
  const [selEndTime, setselEndTime] = useState("");
  const [selReason, setselReason] = useState("");
  const [selDuration, setselDuration] = useState("");
  const [selComments, setselComments] = useState("");
  const [selpkID, setselpkID] = useState("");
  const [selSecondarypk, setSelSecondarypk] = useState("")
  const [status, setStatus] = useState("");

  const handleStatusChange = (e) => {setStatus(e.target.value)};

  //handles the dropdown for selecting different tables
  const [tableValue, setTableValue] = useState(-1);
  const handleTableChange = (event) => {
    setTableValue(event.target.value);
    DisplayRecords(event.target.value);
  };
  //for changing the number of records per page on the datagrid
  const [pageSize, setPageSize] = React.useState(5);
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  //hanldles snackbar 
  const [snackOpen, setSnackOpen] = React.useState(false);
  const handleSnackClick = () => {
    setSnackOpen(true);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  const [snackMsg, setSnackMsg] = useState("");

  const EditRecord = (item) =>
  {
      handleShow();
      setselID(item.id);
      setselpkID(item.pkdowntimeeventid);
      setselLineID(item.LineID);
      setselMachineID(item.Machine);
      setselComponentID(item.ComponentID);
      setselStartTime(item.StartDateTime);
      setselEndTime(item.EndDateTime);
      setselReason(item.Reason);
      setselDuration(item.DurationTotalMinutes);
      setselComments(item.Comments);
      setSelSecondarypk(item.Secondarypk)
      setStatus(item.Status);
  }

   
  const DisplayRecords = async (line) => 
        {
            if(line < 0){
              setrows([])
              return;
            }
              
            await axios.post('http://localhost:5000/editedRecords/',
            {
              line: line
            },config)
            .then((response) => {
                    setrows(response.data)
            }, (error) => {
              console.log(error);
            });
            
        };


        const closeAndAccept = () => {
            updateStatus();
            handleClose();
        }

        const updateStatus = async () => {
          await axios.post(buildPath('editedRecords/edit'), 
          {
            ID: selID,
            status: status
          },config)
            .then((response) => {
              DisplayRecords(tableValue);
              if(response.data.status === "Successful")
              {
                  handleSnackClick()
                  setSnackMsg("Success : Your change has been submitted!")
              }
              else
              {
                handleSnackClick()
                setSnackMsg("Error : request not submitted")
              }
            }, (error) => {
              console.log(error.request)
            });
        }
    
    return (
    <div>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} variant="filled" severity="info">
          {snackMsg}
        </Alert>
      </Snackbar>
    <br/>
    <br/>
    <div>
      <Grid container justify="center">
      <Box border={1} borderRadius="borderRadius" borderColor="grey.500" width="90%" p={5} boxShadow={6} >
        <Grid container spacing={2}>
          <Grid item xs={3}>
      
          <Box color="white" p={1} textAlign="center" fontSize="h6.fontSize" fontWeight="fontWeightRegular" maxWidth="250px" bgcolor="primary.main" boxShadow={4} borderRadius="borderRadius">
            Edited LIS Records
          </Box>
         
          </Grid>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={3} >
          <Box>
          <FormControl fullWidth variant="outlined" >
          <InputLabel>Select Table</InputLabel>
            <Select
              displayEmpty
              value={tableValue}
              label="Select Table"
              onChange={handleTableChange}
              IconComponent = {TableChartIcon}
            >
              <MenuItem value={-1} disabled>Select Table...</MenuItem>
              <Divider></Divider>
              <MenuItem value={0}>Display All Lines</MenuItem>
              <Divider></Divider>
              <MenuItem value={-2} disabled>System 1</MenuItem>
              <MenuItem value={1}>Line 1</MenuItem>
              <MenuItem value={2}>Line 2</MenuItem>
              <MenuItem value={3}>Line 3</MenuItem>
              <MenuItem value={4}>Line 4</MenuItem>
              <MenuItem value={8}>Line 8</MenuItem>
              <Divider></Divider>
              <MenuItem value={-3} disabled>System 2</MenuItem>
              <MenuItem value={4}>Line 4</MenuItem>
              <MenuItem value={5}>Line 5</MenuItem>
              <MenuItem value={6}>Line 6</MenuItem>
              <MenuItem value={7}>Line 7</MenuItem>
              <MenuItem value={9}>Line 9</MenuItem>
              <Divider></Divider>
            </Select>
          </FormControl>
          </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box justifyContent="center" border={1} borderRadius="borderRadius" borderColor="grey.500" >
              <DataGrid 
              components={             
                {Toolbar: GridToolbar,
                NoRowsOverlay: CustomNoRowsOverlay}              
              } 
              rows={rows} 
              columns={columns} 
              autoHeight 
              onRowClick = {item => {EditRecord(item.row)}} 
              cancelOnEscape = {true}
              className={classes.grid}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              rowsPerPageOptions={[5, 10, 20, 50]}
              />
            </Box>
          </Grid>
        </Grid>
        </Box>
        </Grid>
      </div>

{localStorage.getItem("privledge") == "2" || localStorage.getItem("privledge") === "3" ? 
  <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Record Confirmation</Modal.Title>
  </Modal.Header>
  <Modal.Body>
 
            <div>
             <TextField
             disabled
              id="ID"
              label="ID"
              defaultValue={selID}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>
              <br/>
              <div> 
              <TextField
              disabled
              id="LineID"
              label="LineID"
              defaultValue={selLineID}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>
             <br/>
              <div> 
               
               <TextField
               disabled
              id="MachineID"
              label="MachineID"
              defaultValue={selMachineID}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>
                <br/>
                <div>
              <TextField
              disabled
              id="ComponentID"
              label="ComponentID"
              defaultValue={selComponentID}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>
              <br/>
              <div>   
             
               <TextField
               disabled
              id="startTime"
              label="StartTime"
              defaultValue={selStartTime}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>
              
                <br/>
                <div>
              <TextField

              disabled
              id="EndTime"
              label="EndTime"
              defaultValue={selEndTime}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>
                <br/>
                <div>

               <TextField
               disabled
              id="Comment"
              label="Comment"
              defaultValue={selComments}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>
                <br/>
                
              <div>

               <TextField    
              disabled
              id="Duration"
              label="Duration"
              defaultValue={selDuration}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
             </div>
             <br/>
             <div>
              <TextField    
              disabled
              id="Secondarypk"
              label="Secondarypk"
              defaultValue={selSecondarypk}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>
              <br/>
             <div>
              <TextField    
              disabled
              id="reason"
              label="Reason"
              defaultValue={selReason}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
              </div>

            <br/>

<Box border={1} borderColor="grey.500" p={2} borderRadius="borderRadius">    
<FormControl component="fieldset">
<FormLabel component="legend">Select record status: <b>{status}</b> </FormLabel>
<RadioGroup aria-label="select" name="select" onChange={handleStatusChange} >
<FormControlLabel value="Approve" control={<Radio />} label="Approve" />
<FormControlLabel value="Reject" control={<Radio />} label="Reject" />
<FormControlLabel value="Delete" control={<Radio />} label="Delete" />
</RadioGroup>
</FormControl>
</Box>
 
   </Modal.Body>
   <Modal.Footer>
    <Button  onClick={handleClose}>
      Cancel
    </Button>
    <Button color="primary" onClick={closeAndAccept}>
      Submit Edit
    </Button>
  </Modal.Footer>
</Modal>
  : null }
    </div>
    );
  }export default EditedTable;


  //secondary
