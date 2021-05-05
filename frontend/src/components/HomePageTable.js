import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button} from '@material-ui/core'
import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const columns = [
  { field: 'id', headerName: 'UniqueID', width: 70 },
  { field: 'lineid', headerName: 'LineID', width: 130 },
  { field: 'machineid', headerName: 'MachineID', width: 130 },
  { field: 'componentid', headerName: 'ComponentID', width: 130 },
  { field: 'startTime', headerName: 'StartTime', width: 250 },
  { field: 'endTime', headerName: 'EndTime', width: 250 },
  { field: 'reason', headerName: 'Reason', width: 130 },
  { field: 'duration', headerName: 'Duration', width: 130 },
  { field: 'shift', headerName: 'Shift', width: 130 },
];

const rows = [];
var temp;
var i;
function DataTable() {

  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [rows, setrows] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selID, setselID] = useState();
  const [selLineID, setselLineID] = useState();
  const [selMachineID, setselMachineID] = useState();
  const [selComponentID, setselComponentID] = useState();
  const [selStartTime, setselStartTime] = useState();
  const [selEndTime, setselEndTime] = useState();
  const [selReason, setselReason] = useState();
  const [selDuration, setselDuration] = useState();
  const [selShift, setselShift] = useState();

  /*
  var DisplayRecords;
  window.onload = DisplayRecords = async event => 
      {
          event.preventDefault();
          try
          {    
              const response = await fetch('http://localhost:5000/API/SearchMachine',
                  {method:'GET',headers:{'Content-Type': 'application/json'}});
              const record=[];
              var res = JSON.parse(await response.text());
              console.log(res.recordset)
              if(res.recordset)
              {
                  for(i=0;i<res.recordset.length;i++)
                  {
                    temp = {
                      "id" : res.recordset[i].ID,
                      "lineid" : res.recordset[i].LineID,
                      "machineid" : res.recordset[i].Machine,
                      "componentid" : res.recordset[i].ComponentID,
                      "startTime" : res.recordset[i].StartDateTime,
                      "endTime" : res.recordset[i].EndDateTime,
                      "reason" : res.recordset[i].Comments,
                      "duration" : res.recordset[i].DurationTotalMinutes,
                      "shift" : res.recordset[i].Secondarypk,
                    }
                    record.push(temp);
                  }
                  setrows(record)
              }
              
          }
          catch(e)
          {
              alert(e.toString());
              return;
          }    
      };
  */
  const EditRecord = (item) =>
  {
      handleShow()
      setselID(item.id)
      setselLineID(item.lineid)
      setselMachineID(item.machineid)
      setselComponentID(item.componentid)
      setselStartTime(item.startTime)
      setselEndTime(item.endTime)
      setselReason(item.reason)
      setselDuration(item.duration)
      setselShift(item.shift)
  }
  
  const doEditRecord = async event =>
  {
     event.preventDefault();
      var newid = document.getElementById("idEdit").value
      var newlineid = document.getElementById("lineidEdit").value
      var newmachineid = document.getElementById("machineidEdit").value
      var newcomponentid = document.getElementById("componentidEdit").value
      var newstarttime = document.getElementById("startTimeEdit").value
      var newendtime = document.getElementById("endTimeEdit").value
      var newreason = document.getElementById("reasonEdit").value
      var newduration = document.getElementById("durationEdit").value
      var newshift = document.getElementById("shiftEdit").value
      console.log(newid)
      var obj = {startDate : newstarttime, endDate : newendtime, durationTotalMinutes : newduration, lineID : newlineid, machine : newmachineid, componentID : newcomponentid, comments : newreason, secondarypk : newshift}
      
       var js = JSON.stringify(obj);  
      
        try
            {    
                const response = await fetch('http://localhost:5000/API/AddEditedRecord',
                    {method:'POST',body:js, headers:{'Content-Type': 'application/json'}});
                var res = JSON.parse(await response.text());      
            }
            catch(e)
            {
                alert(e.toString());
                return;
            }      
  };

  async function searchRecords(){
    var filter = document.getElementById("searchBar").value
    var data = JSON.stringify({ "filter": filter });
    try{    
      const response = await fetch('http://localhost:5000/machineRecords',
      {method:'POST',body:data,headers:{'Content-Type': 'application/json'}});
      const record=[];
      var res = JSON.parse(await response.text());
      if(res.recordset){
        for(i=0;i<res.recordset.length;i++){
          temp = {
            "id" : res.recordset[i].UniqueID,
            "startTime" : res.recordset[i].StartDateTime,
            "endTime" : res.recordset[i].EndDateTime,
            "duration" : res.recordset[i].DurationTotalMinutes,
            "lineid" : res.recordset[i].LineID,
            "machineid" : res.recordset[i].Machine,
            "componentid" : res.recordset[i].ComponentID,
            "reason" : res.recordset[i].Comments,
            "shift" : res.recordset[i].Secondarypk,
          }
            record.push(temp);
        }
        setrows(record)
      }
    }
    catch(e){
      alert(e.toString());
      return;
     }  
    return true;
  }

  return (
    <div>
    <div><br></br><h3>Machine Data</h3></div>

    <div>
      <SearchBar id = "searchBar" onRequestSearch={searchRecords} placeholder="Search Records..." autoFocus />
    </div>
    
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} onRowClick = {item => {EditRecord(item.row)}} cancelOnEscape = {true}/>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
              <TextField
              id="idEdit"
              label="ID"
              defaultValue={selID}
              variant="outlined"
              
              />
          </div>
          <div>
          <TextField
              id="lineidEdit"
              label="LineID"
              defaultValue={selLineID}
              variant="outlined"
              />
          </div>
          <div>
          <TextField
              id="machineidEdit"
              label="MachineID"
              defaultValue={selMachineID}
              variant="outlined"
              />
          </div>
          <div>
          <TextField
              id="componentidEdit"
              label="ComponentID"
              defaultValue={selComponentID}
              variant="outlined"
              />
          </div>
          <div>
          <TextField
              id="startTimeEdit"
              label="StartTime"
              defaultValue={selStartTime}
              variant="outlined"
              />
          </div>
          <div>
          <TextField
              id="endTimeEdit"
              label="EndTime"
              defaultValue={selEndTime}
              variant="outlined"
              />
          </div>
          <div>
          <TextField
              id="reasonEdit"
              label="Reason"
              defaultValue={selReason}
              variant="outlined"
              />
          </div>
          <div>
          <TextField
              id="durationEdit"
              label="Duration"
              defaultValue={selDuration}
              variant="outlined"
              />
          </div>
          <div>
          <TextField
              id="shiftEdit"
              label="Shift"
              defaultValue={selShift}
              variant="outlined"
              />
          </div>
        </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={doEditRecord}>
            Submit Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}export default DataTable;