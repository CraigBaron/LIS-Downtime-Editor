import * as React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { DataGrid } from '@material-ui/data-grid';
import {Button} from '@material-ui/core'
import {useState} from 'react'
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import {Box} from "@material-ui/core"
import {Modal} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { buildPath, config } from "./config";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
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

    const [ selpkID, setselpkID] = useState();
    const [selID, setselID] = useState();
    const [selLineID, setselLineID] = useState();
    const [selMachineID, setselMachineID] = useState();
    const [selComponentID, setselComponentID] = useState();
    const [selStartTime, setselStartTime] = useState();
    const [selEndTime, setselEndTime] = useState();
    const [selReason, setselReason] = useState();
    const [selDuration, setselDuration] = useState();
    const [selComments, setselComments] = useState();
    
    const [status, setStatus] = useState(null);
    const [ID, setID] = useState(null);



    const handleStatusChange = (e) => {setStatus(e.target.value)};
    const handleIDChange = (e) => {setID(e.target.value)};


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
  }

   
    var DisplayRecords;
    window.onload = DisplayRecords = async () => 
        {
            const record = [];
            let temp
            await axios.get('http://localhost:5000/editedRecords', config)
            .then((response) => {
              for(var i=0;i<response.data[0].length;i++)
                    {
                      temp = {
                        "id" : response.data[0][i].UniqueID,
                        "LineID" : response.data[0][i].LineID,
                        "Machine" : response.data[0][i].Machine,
                        "ComponentID" : response.data[0][i].ComponentID,
                        "StartDateTime" : response.data[0][i].StartDateTime,
                        "EndDateTime" : response.data[0][i].EndDateTime,
                        "Comments" : response.data[0][i].Comments,
                        "DurationTotalMinutes" : response.data[0][i].DurationTotalMinutes,
                        "Secondarypk" : response.data[0][i].Secondarypk,
                        "Reason" : response.data[0][i].Reason,
                        "Status" : response.data[0][i].Status,
                      }
                      record.push(temp);
                    }
                    setrows(record)
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
              DisplayRecords();
            }, (error) => {
              console.log(error.request)
            });
        }



    async function searchRecords(){
      handleShow();
      var filter = document.getElementById("searchBar").value
      var data = JSON.stringify({ "filter": filter });
      try{    
        const response = await fetch('http://localhost:5000/editedRecords',
        {method:'POST',body:data,headers:{'Content-Type': 'application/json'}});
        const record=[];
        var res = JSON.parse(await response.text());
        if(res.recordset){
          for(i=0;i<res.recordset.length;i++){
            temp = {
              "id" : response.data[0][i].UniqueID,
              "LineID" : response.data[0][i].LineID,
              "Machine" : response.data[0][i].Machine,
              "ComponentID" : response.data[0][i].ComponentID,
              "StartDateTime" : response.data[0][i].StartDateTime,
              "EndDateTime" : response.data[0][i].EndDateTime,
              "Comments" : response.data[0][i].Comments,
              "DurationTotalMinutes" : response.data[0][i].DurationTotalMinutes,
              "Secondarypk" : response.data[0][i].Secondarypk,
              "Reason" : response.data[0][i].Reason,
              "Status" : response.data[0][i].Status,
              
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
    
    <div>
      <Box marginTop="2%" alignItems="center" display="flex" justifyContent="center">
      <SearchBar style={{width: '20%'}} id = "searchBar" onRequestSearch={searchRecords} placeholder="Search Records..." autoFocus />
      </Box>
    </div>
    <br></br>
    <div style={{ height: 800, width: '100%' }}>
    <div><h3>Edited Records</h3></div>
    <DataGrid  rows={rows} columns={columns} autoHeight pageSize={20} onRowClick = {item => {EditRecord(item.row)}} cancelOnEscape = {true}/>
    </div>
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
              onChange={handleIDChange}
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
            
  <FormControl component="fieldset">


<FormLabel component="legend">Select record status:</FormLabel>
<RadioGroup aria-label="select" name="select" onChange={handleStatusChange} >
<FormControlLabel value="Approve" control={<Radio />} label="Approve" />
<FormControlLabel value="Reject" control={<Radio />} label="Reject" />
<FormControlLabel value="Delete" control={<Radio />} label="Delete" />
</RadioGroup>
</FormControl>

 
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button color="primary" onClick={closeAndAccept}>
      Submit Edit
    </Button>
  </Modal.Footer>
</Modal>
    </div>
    );
  }export default EditedTable;


  