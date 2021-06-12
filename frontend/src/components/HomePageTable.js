import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {Button, Container, InputAdornment} from '@material-ui/core'
import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";
import {Box, Card} from "@material-ui/core"
import {Form, Row, Col} from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import { positions } from '@material-ui/system'
import Typograghy from '@material-ui/core/Typography'
import axios from 'axios';
import {buildPath} from './config'
import { Machine, Reason } from './dropDown';

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
}));

const columns = [
  { field: 'id', headerName: 'UniqueID', width: 130 },
  { field: 'pkDowntimeEventID', headerName: 'pkDowntimeEventID', width: 130 },
  { field: 'LineID', headerName: 'LineID', width: 130 },
  { field: 'Machine', headerName: 'MachineID', width: 200 },
  { field: 'ComponentID', headerName: 'ComponentID', width: 200 },
  { field: 'StartDateTime', headerName: 'StartTime', width: 250 },
  { field: 'EndDateTime', headerName: 'EndTime', width: 250 },
  { field: 'Comments', headerName: 'Comments', width: 130 },
  { field: 'DurationTotalMinutes', headerName: 'Duration', width: 130 },
  { field: 'Secondarypk', headerName: 'Secondarypk', width: 130 },

];

const rows = [];

function DataTable() {

  const [Reasons, setReason] = React.useState('EUR');

  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [rows, setrows] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selpkID, setselpkID] = useState();
  const [selID, setselID] = useState();
  const [selLineID, setselLineID] = useState();
  const [selMachineID, setselMachineID] = useState();
  const [selComponentID, setselComponentID] = useState();
  const [selStartTime, setselStartTime] = useState();
  const [selEndTime, setselEndTime] = useState();
  const [selReason, setselReason] = useState();
  const [selDuration, setselDuration] = useState();
  const [selShift, setselShift] = useState();
  
  const [tableValue, setTableValue] = React.useState();

  const handleTableChange = (event) => {
    setTableValue(event.target.value);
    displayRecords(event.target.value);
  };
  const EditRecord = (item) =>
  {
      handleShow();
      setselID(item.id);
      setselpkID(item.pkDowntimeEventID);
      setselLineID(item.LineID);
      setselMachineID(item.Machine);
      setselComponentID(item.ComponentID);
      setselStartTime(item.StartDateTime);
      setselEndTime(item.EndDateTime);
      setselReason(item.Comments);
      setselDuration(item.DurationTotalMinutes);
      setselShift(item.Secondarypk);          
  }

  const displayRecords = async (lineNumber) => {

    await axios.post(buildPath('machineRecords/'), {
      lineNumber : lineNumber
    })
      .then((response) => {
        setrows(response.data.recordsets[0])
      }, (error) => {
        console.log(error.request)
      })
      
  }

  
  const doEditRecord = async event =>
  {
     event.preventDefault();
      var newid = document.getElementById("idEdit").value
      var newlineid = document.getElementById("lineidEdit").value
      var newpkid = document.getElementById("pkidEdit").value
      var newmachineid = document.getElementById("machineidEdit").value
      var newcomponentid = document.getElementById("componentidEdit").value
      var newstarttime = document.getElementById("startTimeEdit").value
      var newendtime = document.getElementById("endTimeEdit").value
      var newreason = document.getElementById("reasonEdit").value
      var newduration = document.getElementById("durationEdit").value
      var newshift = document.getElementById("shiftEdit").value
      var obj = {uniqueID : newid, pkDowntimeEventID : newpkid, startDate : newstarttime, endDate : newendtime, durationTotalMinutes : newduration, LineID : newlineid, machine : newmachineid, componentID : newcomponentid, comments : newreason, secondarypk : newshift}
      
       var js = JSON.stringify(obj);  
      
        try
            {    
                const response = await fetch('http://localhost:5000/editedRecords/add',
                    {method:'POST',body:js, headers:{'Content-Type': 'application/json'}});
                var res = JSON.parse(await response.text());      
            }
            catch(e)
            {
                alert(e.toString());
                return;
            }   
    
  };


  
  return (
    <div>
    <br/>
    <br></br>
    <Col>
    <Card variant="outlined">
    <Col>
    <br/>
      <Row>
        <Col>
          <Typograghy>
          <Box color="white" textAlign="center" fontSize="200%" fontWeight="fontWeightRegular" height="80%" maxWidth="85%" bgcolor="primary.main" boxShadow={4} borderRadius="borderRadius">
            LIS-Downtime Data
          </Box>
          </Typograghy>
        </Col>
        <Col>
          <Box >
          <TextField
            label="Search Records"
            placeholder="Search..."
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position=""><SearchIcon/></InputAdornment>
            }}
          />
          </Box>
        </Col>
        <Col>
          <Box>
          <FormControl fullWidth variant="outlined" >
          <InputLabel id="demo-simple-select-outlined-label">Select Table</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={tableValue}
              label="Select Table"
              onChange={handleTableChange}
              IconComponent = {TableChartIcon}
            >
              <MenuItem value={11}>System 1 Line 1</MenuItem>
              <MenuItem value={12}>System 1 Line 2</MenuItem>
              <MenuItem value={13}>System 1 Line 3</MenuItem>
              <MenuItem value={14}>System 1 Line 4</MenuItem>
              <MenuItem value={18}>System 1 Line 8</MenuItem>
              <MenuItem value={24}>System 2 Line 4</MenuItem>
              <MenuItem value={25}>System 2 Line 5</MenuItem>
              <MenuItem value={26}>System 2 Line 6</MenuItem>
              <MenuItem value={27}>System 2 Line 7</MenuItem>
              <MenuItem value={29}>System 2 Line 9</MenuItem>
            </Select>
          </FormControl>
          </Box>
          </Col>
        </Row>
        <br/>
      <Row>
        <Col>
          <Box width="auto" display="flex" justifyContent="center">
            <DataGrid components={{Toolbar: GridToolbar}} rows={rows} columns={columns} autoHeight pageSize={20} onRowClick = {item => {EditRecord(item.row)}} cancelOnEscape = {true}/>
          </Box>
        </Col>
      </Row>
      <br/>
      </Col>
      </Card>
      </Col>
    

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <br/>
        <Col>
          <Box display="block" >
            <TextField
              disabled
              id="idEdit"
              label="UniqueID"
              defaultValue={selID}
              variant="outlined"
              fullWidth
              InputProps={{readOnly: true,}}
              />
          </Box>
          <br/>

          <Box display="block">
            <TextField
              disabled
              id="pkidEdit"
              label="pkDowntimeEventID"
              defaultValue={selpkID}
              variant="outlined"
              fullWidth
              />
          </Box>
          <br/>
          
          <Box display="block">
            <TextField
              disabled
              id="lineidEdit"
              label="LineID"
              defaultValue={selLineID}
              variant="outlined"
              fullWidth
              />
          </Box>
          <br/>

          <Box>
            <TextField
              id="machineidEdit"
              fullWidth
              select
              label="MachineID"
              defaultValue={selMachineID}
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
            {Machine.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}       
            </TextField>
          </Box>
          <br/>

          <Box>
            <TextField
                disabled
                id="componentidEdit"
                label="ComponentID"
                defaultValue={selComponentID}
                variant="outlined"
                fullWidth
                />
          </Box>
          <br/>
          <Box>
          <TextField
              id="startTimeEdit"
              label="StartTime"
              defaultValue={selStartTime}
              variant="outlined"
              />
         
          </Box>              
          <br/>
          <Box>
          <TextField
              id="endTimeEdit"
              label="EndTime"
              defaultValue={selEndTime}
              variant="outlined"             
              />
          </Box>  
          <br/>
        <Box>
          <TextField
            id="reasonEdit"
            select
            fullWidth
            label="Reason for change"
            onChange={handleChange}
            variant="outlined"
            SelectProps={{
              native: true,
            }}          
            >
            {Reason.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box> 
        <br/> 

        <Box>
          <TextField
              disabled
              id="durationEdit"
              label="Duration"
              defaultValue={selDuration}
              variant="outlined"
              fullWidth
              />
        </Box>
        <br/>
          <TextField
              disabled
              id="shiftEdit"
              label="Shift"
              defaultValue={selShift}
              variant="outlined"
              fullWidth
              />
          </Col>
          <br/>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button  color="primary" onClick={doEditRecord}>
            Submit Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}export default DataTable;
