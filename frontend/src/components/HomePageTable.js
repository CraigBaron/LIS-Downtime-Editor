import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
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
  { field: 'pkdowntimeeventid', headerName: 'pkDowntimeEventID', width: 130 },
  { field: 'lineid', headerName: 'LineID', width: 130 },
  { field: 'machineid', headerName: 'MachineID', width: 200 },
  { field: 'componentid', headerName: 'ComponentID', width: 200 },
  { field: 'startTime', headerName: 'StartTime', width: 250 },
  { field: 'endTime', headerName: 'EndTime', width: 250 },
  { field: 'reason', headerName: 'Comments', width: 130 },
  { field: 'duration', headerName: 'Duration', width: 130 },
  { field: 'shift', headerName: 'Secondarypk', width: 130 },

];

const Reason = [
  {
    value: 'Null',
    label: 'Select',
  },
  {
    value: 'Accumulation Table',
    label: 'Accumulation Table',
  },
  {
    value: 'Accumulation Table 1',
    label: 'Accumulation Table 1',
  },
  {
    value: 'Accumulation Table 2',
    label: 'Accumulation Table 2',
  },
  {
    value: 'Air Conveyor',
    label: 'Air Conveyor',
  },
  
  {
    value: 'AS-6 / Explain',
    label: 'AS-6 / Explain',
  },
  {
    value: 'Automation',
    label: 'Automation',
  },
  {
    value: 'Bad Material/Explain',
    label: 'Bad Material/Explain',
  },
  {
    value: 'Bad Photoeye',
    label: 'Bad Photoeye',
  },
  {
    value: 'Bad Suction Cup/Filter',
    label: 'Bad Suction Cup/Filter',
  },
  {
    value: 'Bag Feed',
    label: 'Bag Feed',
  },
  {
    value: 'Blend Not Ready/Blend Corrections',
    label: 'Blend Not Ready/Blend Corrections',
  },
  {
    value: 'Blending Water Purge',
    label: 'Blending Water Purge',
  },
  {
    value: 'Bottle Coder',
    label: 'Bottle Coder',
  },
  {
    value: 'Bottle Jam',
    label: 'Bottle Jam',
  },
  {
    value: 'Bottle Jam (Laner)',
    label: 'Bottle Jam (Laner)',
  },
  {
    value: 'Bottle Jam/Reset Machine/Web Break',
    label: 'Bottle Jam/Reset Machine/Web Break',
  },
  {
    value: 'Bottle Process Adjustment',
    label: 'Bottle Process Adjustment',
  },
  {
    value: 'Box Infeed Jam',
    label: 'Box Infeed Jam',
  },
  {
    value: 'Box Outfeed Jam',
    label: 'Box Outfeed Jam',
  },

   {
    value: 'Broken Belt',
    label: 'Broken Belt',
  },
  {
    value: 'Broken Conveyor',
    label: 'Broken Conveyor',
  },
  {
    value: 'Broken Film',
    label: 'Broken Film',
  },
  {
    value: 'Broken Finger',
    label: 'Broken Finger',
  },
  {
    value: 'Cap Jam',
    label: 'Cap Jam',
  },
  {
    value: 'Cap Jam/No Closure',
    label: 'Cap Jam/No Closure',
  },
  {
    value: 'Case Jam',
    label: 'Case Jam',
  },
  {
    value: 'Cleaning',
    label: 'Cleaning',
  },
  {
    value: 'Cocked/Broken Caps',
    label: 'Cocked/Broken Caps',
  },
  {
    value: 'Code Not Legible',
    label: 'Code Not Legible',
  },
  {
    value: 'Coder Out of Ink',
    label: 'Coder Out of Ink',
  },
  {
    value: 'Collating Section',
    label: 'Collating Section',
  },
  {
    value: 'Crash in Hoist',
    label: 'Crash in Hoist',
  },
  {
    value: 'Cutting Issue',
    label: 'Cutting Issue',
  },
  {
    value: 'Cutting Knife',
    label: 'Cutting Knife',
  },
  {
    value: 'Cutting/Wrapping/ShrinkTunnel',
    label: 'Cutting/Wrapping/ShrinkTunnel',
  },
  {
    value: 'Damaged Gripper',
    label: 'Damaged Gripper',
  },
  {
    value: 'Damaged Neck Rail',
    label: 'Damaged Neck Rail',
  },
  {
    value: 'Discharge Jam',
    label: 'Discharge Jam',
  },
  {
    value: 'Down Bottle Bin Fault',
    label: 'Down Bottle Bin Fault',
  },
  {
    value: 'Down Bottles',
    label: 'Down Bottles',
  },
  {
    value: 'Elevator',
    label: 'Elevator',
  },
  {
    value: 'E-Ray/Explain',
    label: 'E-Ray/Explain',
  },
  {
    value: 'E-Stop',
    label: 'E-Stop',
  },
  {
    value: 'Fill Weight Adjustments',
    label: 'Fill Weight Adjustments',
  },
  {
    value: 'Film Roll Changes',
    label: 'Film Roll Changes',
  },
  {
    value: 'Film Wrap',
    label: 'Film Wrap',
  },
  {
    value: 'Folding/Glueing',
    label: 'Folding/Glueing',
  },
  {
    value: 'Glue Nozzle',
    label: 'Glue Nozzle',
  },
  {
    value: 'Glueing Issue',
    label: 'Glueing Issue',
  },
  {
    value: 'Hot Water Flush',
    label: 'Hot Water Flush',
  },
  {
    value: 'Hueft',
    label: 'Hueft',
  },
  {
    value: 'Hueft/Reject',
    label: 'Hueft/Reject',
  },
  {
    value: 'Hygiene Center',
    label: 'Hygiene Center',
  },
  {
    value: 'IF Screw Fault',
    label: 'IF Screw Fault',
  },
  {
    value: 'Infeed Backing Up',
    label: 'Infeed Backing Up',
  },
  {
    value: 'Infeed Bottle Jam',
    label: 'Infeed Bottle Jam',
  },
  {
    value: 'Infeed Gap / Down Bottles',
    label: 'Infeed Gap / Down Bottles',
  },
  {
    value: 'Infeed Jam',
    label: 'Infeed Jam',
  },
  {
    value: 'Infeed Pallet Jam',
    label: 'Infeed Pallet Jam',
  },
  {
    value: 'Infeed/Collating/Tray feed',
    label: 'Infeed/Collating/Tray feed',
  },
  {
    value: 'Label Adjustment',
    label: 'Label Adjustment',
  },
  {
    value: 'Laner Jam',
    label: 'Laner Jam',
  },
  {
    value: 'Layering Issues',
    label: 'Layering Issues',
  },
  {
    value: 'Mechanical',
    label: 'Mechanical',
  },
  {
    value: 'Mechanical Failure',
    label: 'Mechanical Failure',
  },
  {
    value: 'Not Reading',
    label: 'Not Reading',
  },
  {
    value: 'Octave',
    label: 'Octave',
  },
  {
    value: 'Open Box',
    label: 'Open Box',
  },
  
  {
    value: 'Orientation',
    label: 'Orientation',
  },
  {
    value: 'Other/Explain',
    label: 'Other/Explain',
  },
  {
    value: 'Out of Ink/Make up Fluid',
    label: 'Out of Ink/Make up Fluid',
  },
  {
    value: 'Outfeed Jam',
    label: 'Outfeed Jam',
  },
  {
    value: 'Outfeed/Reject',
    label: 'Outfeed/Reject',
  },
  {
    value: 'Pallet Crash',
    label: 'Pallet Crash',
  },
  {
    value: 'Pallet Discharge',
    label: 'Pallet Discharge',
  },
  {
    value: 'Photo Eye',
    label: 'Photo Eye',
  },
  {
    value: 'Photoeye Fogged',
    label: 'Photoeye Fogged',
  },
  {
    value: 'Power Outage',
    label: 'Power Outage',
  },
  {
    value: 'Preform Hopper/Conveyor',
    label: 'Preform Hopper/Conveyor',
  },
  {
    value: 'Print and Apply',
    label: 'Print and Apply',
  },
  {
    value: 'Print Head Fault',
    label: 'Print Head Fault',
  },
  {
    value: 'Rinser',
    label: 'Rinser',
  },
  {
    value: 'Robot/Automation Issues',
    label: 'Robot/Automation Issues',
  },
  {
    value: 'Saber Adjustment',
    label: 'Saber Adjustment',
  },
  {
    value: 'Safety Circuit',
    label: 'Safety Circuit',
  },
  {
    value: 'Sanibar',
    label: 'Sanibar',
  },
  {
    value: 'Sanitation/Shared Equipment',
    label: 'Sanitation/Shared Equipment',
  },
  {
    value: 'Sanitize/Excessive Foam',
    label: 'Sanitize/Excessive Foam',
  },
  {
    value: 'Scale Calibration',
    label: 'Scale Calibration',
  },
  {
    value: 'Servo Fault',
    label: 'Servo Fault',
  },
  {
    value: 'Side-A Servo Gate/Laner jam',
    label: 'Side-A Servo Gate/Laner jam',
  },
  {
    value: 'Side-B Servo Gate/Laner jam',
    label: 'Side-B Servo Gate/Laner jam',
  },
  {
    value: 'Sleeve Jam',
    label: 'Sleeve Jam',
  },
  {
    value: 'SOP',
    label: 'SOP',
  },
  {
    value: 'Spiral',
    label: 'Spiral',
  },
  {
    value: 'Starwheel Jam',
    label: 'Starwheel Jam',
  },
  {
    value: 'Station 1/Explain',
    label: 'Station 1/Explain',
  },
  {
    value: 'Station 2/Explain',
    label: 'Station 2/Explain',
  },
  {
    value: 'Station 3/Explain',
    label: 'Station 3/Explain',
  },
  {
    value: 'Station 4/Explain',
    label: 'Station 4/Explain',
  },
  {
    value: 'Station 5/Explain',
    label: 'Station 5/Explain',
  },
  {
    value: 'Station 6/Explain',
    label: 'Station 6/Explain',
  },
  {
    value: 'Steam Tunnel Issues/Explain',
    label: 'Steam Tunnel Issues/Explain',
  },
  {
    value: 'Temperature',
    label: 'Temperature',
  },
  {
    value: 'Transfer Issue',
    label: 'Transfer Issue',
  },
  {
    value: 'Tray Jam',
    label: 'Tray Jam',
  },
  {
    value: 'Turned Box',
    label: 'Turned Box',
  },
   {
    value: 'Valve/Explain',
    label: 'Valve/Explain',
  },
   {
    value: 'VFD Fault',
    label: 'VFD Fault',
  },
  {
    value: 'Water Purge',
    label: 'Water Purge',
  },
  {
    value: 'Weight Scale Fault',
    label: 'Weight Scale Fault',
  },
  {
    value: 'Whse Conveyor Jam',
    label: 'Whse Conveyor Jam',
  },
  {
    value: 'X-Ray/Explain',
    label: 'X-Ray/Explain',
  },
  
];


const rows = [];
var temp;
var i;
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
  
  const [tableValue, setTableValue] = React.useState('');

  const handleTableChange = (event) => {
    setTableValue(event.target.value);
  };

  var DisplayRecords;
  window.onload = DisplayRecords = async event => 
      {
          event.preventDefault();
          try
          {    
              const response = await fetch('http://localhost:5000/machineRecords/',
                  {method:'GET',headers:{'Content-Type': 'application/json'}});
              const record=[];
              var res = JSON.parse(await response.text());
              if(res.recordset)
              {
                  for(i=0;i<res.recordset.length;i++)
                  {
                    temp = {
                      "id" : res.recordset[i].id,
                      "pkdowntimeeventid" : res.recordset[i].pkDowntimeEventID,
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

      
  
  const EditRecord = (item) =>
  {
      handleShow();
      setselID(item.id);
      setselpkID(item.pkdowntimeeventid);
      setselLineID(item.lineid);
      setselMachineID(item.machineid);
      setselComponentID(item.componentid);
      setselStartTime(item.startTime);
      setselEndTime(item.endTime);
      setselReason(item.reason);
      setselDuration(item.duration);
      setselShift(item.shift); 
                 
  }

  const Machine = [

    {
      value: selMachineID,
      label: selMachineID,
    },
    
    {
      value: 'Airveyor',
      label: 'Airveyor',
    },
    {
      value: 'Airveyor (BM - Labeler)',
      label: 'Airveyor (BM - Labeler)',
    },
    {
      value: 'Airveyor (Labeler-Filler)',
      label: 'Airveyor (Labeler-Filler)',
    },
    {
      value: 'Bag Conveyor (Filler-Box Sealer)',
      label: 'Bag Conveyor (Filler-Box Sealer)',
    },
    {
      value: 'Bag Scale',
      label: 'Bag Scale',
    },
    {
      value: 'Blending',
      label: 'Blending',
    },
  
    {
      value: 'Blow Mold',
      label: 'Blow Mold',
    },
    {
      value: 'Blow Mold 1',
      label: 'Blow Mold 1',
    },
    {
      value: 'Blow Mold 2',
      label: 'Blow Mold 2',
    },
  
      {
      value: 'Bottle Coder',
      label: 'Bottle Coder',
    },
      {
      value: 'Bottle Conveyor (Cooling-Labeler)',
      label: 'Bottle Conveyor (Cooling-Labeler)',
    },  {
      value: 'Bottle Conveyor (Filler-Tamperband)',
      label: 'Bottle Conveyor (Filler-Tamperband)',
    },
    {
      value: 'Bottle Conveyor (Filler-Labeler)',
      label: 'Bottle Conveyor (Filler-Labeler)',
    },
  
      {
      value: 'Bottle Conveyor (Labeler - Kister)',
      label: 'Bottle Conveyor (Labeler - Kister)',
    },
    {
      value: 'Bottle Conveyor (Labeler-Filler)',
      label: 'Bottle Conveyor (Labeler-Filler)',
    },  {
      value: 'Bottle Conveyor (Tamperband-Douglas-Kister)',
      label: 'Bottle Conveyor (Tamperband-Douglas-Kister)',
    },
    {
      value: 'Bottle Conveyor (Tamperband-Kister)',
      label: 'Bottle Conveyor (Tamperband-Kister)',
    },
    {
      value: 'Bottle Conveyor (Tamperband-Kister A)',
      label: 'Bottle Conveyor (Tamperband-Kister A)',
    },
    {
      value: 'Bottle Conveyor (Tamperband-Kister B)',
      label: 'Bottle Conveyor (Tamperband-Kister B)',
    },
    
    {
      value: 'Bottle Conveyor (Tamperband-Mezz)',
      label: 'Bottle Conveyor (Tamperband-Mezz)',
    },
    {
      value: 'Box Coder',
      label: 'Box Coder',
    },
  
    {
      value: 'Box Sealer',
      label: 'Box Sealer',
    },
    {
      value: 'Bundler',
      label: 'Bundler',
    },
    {
      value: 'Cooling Tunel',
      label: 'Cooling Tunel',
    },
    {
      value: 'Depal',
      label: 'Depal',
    },
    {
      value: 'Douglas',
      label: 'Douglas',
    },
    {
      value: 'East Fallas Bag Drop',
      label: 'East Fallas Bag Drop',
    },
    {
      value: 'Empty Bottle Inverter',
      label: 'Empty Bottle Inverter',
    },
    {
      value: 'Empty box Conveyor',
      label: 'Empty box Conveyor',
    },
    {
      value: 'Facilities',
      label: 'Facilities',
    },
    {
      value: 'Filler',
      label: 'Filler',
    },
    {
      value: 'Filler A',
      label: 'Filler A',
    },
    {
      value: 'Filler B',
      label: 'Filler B',
    },
    {
      value: 'Fuji A',
      label: 'Fuji A',
    },
    {
      value: 'Fuji B',
      label: 'Fuji B',
    },
    {
      value: 'Full Bottle Inverter',
      label: 'Full Bottle Inverter',
    },
    {
      value: 'Hi-Cone',
      label: 'Hi-Cone',
    },
    {
      value: 'I-Pack Box Former',
      label: 'I-Pack Box Former',
    },
    {
      value: 'Kister',
      label: 'Kister',
    },
    {
      value: 'Kister-A',
      label: 'Kister-A',
    },
    {
      value: 'Kister-B',
      label: 'Kister-B',
    },
    {
      value: 'Label Machine',
      label: 'Label Machine',
    },
    {
      value: 'Labeler A',
      label: 'Labeler A',
    },
    {
      value: 'Labeler B',
      label: 'Labeler B',
    },
    {
      value: 'Mezzanine Bottle conveyors',
      label: 'Mezzanine Bottle conveyors',
    },
    {
      value: 'Multi - Pack conveyors',
      label: 'Multi - Pack conveyors',
    },
    {
      value: 'Overhead Case Conveyor',
      label: 'Overhead Case Conveyor',
    },
    {
      value: 'Overhead Case Conveyor (KisterA-PZ1)',
      label: 'Overhead Case Conveyor (KisterA-PZ1)',
    },
    {
      value: 'Overhead Case Conveyor (KisterA-PZ2)',
      label: 'Overhead Case Conveyor (KisterA-PZ2)',
    },
    {
      value: 'Overhead Case Conveyor (KisterA-PZ3)',
      label: 'Overhead Case Conveyor (KisterA-PZ3)',
    },
    {
      value: 'Overhead Case Conveyor (KisterA-PZ4)',
      label: 'Overhead Case Conveyor (KisterA-PZ4)',
    },
    {
      value: 'Overhead Case Conveyor (KisterA-PZ6)',
      label: 'Overhead Case Conveyor (KisterA-PZ6)',
    },
    {
      value: 'Overhead Case Conveyor (KisterB-PZ5)',
      label: 'Overhead Case Conveyor (KisterB-PZ5)',
    },
    {
      value: 'Overhead Case Conveyor (KisterB-PZ7)',
      label: 'Overhead Case Conveyor (KisterB-PZ7)',
    },
    {
      value: 'Overhead Case Conveyor (KisterB-PZ8)',
      label: 'Overhead Case Conveyor (KisterB-PZ8)',
    },
    {
      value: 'Overhead Case Conveyor (Kister-Palletizer)',
      label: 'Overhead Case Conveyor (Kister-Palletizer)',
    },
    {
      value: 'Palletizer',
      label: 'Palletizer',
    },
    {
      value: 'Palletizer 1A (PZ1)',
      label: 'Palletizer 1A (PZ1)',
    },
    {
      value: 'Palletizer 1B (PZ5)',
      label: 'Palletizer 1B (PZ5)',
    },
    {
      value: 'Palletizer 2B (PZ4)',
      label: 'Palletizer 2B (PZ4)',
    },
    {
      value: 'Palletizer 2B (PZ8)',
      label: 'Palletizer 2B (PZ8)',
    },
    {
      value: 'Palletizer 3A (PZ3)',
      label: 'Palletizer 3A (PZ3)',
    },
    {
      value: 'Palletizer 3B (PZ2)',
      label: 'Palletizer 3B (PZ2)',
    },
    {
      value: 'Palletizer 8B (PZ6)',
      label: 'Palletizer 8B (PZ6)',
    },
    {
      value: 'Palletizer 8B (PZ7)',
      label: 'Palletizer 8B (PZ7)',
    },
    {
      value: 'Tamper-Band',
      label: 'Tamper-Band',
    },
    {
      value: 'Varia-Glide',
      label: 'Varia-Glide',
    },
    {
      value: 'Vario-Glide',
      label: 'Vario-Glide',
    },
    {
      value: 'West Fallas Bag Drop',
      label: 'West Fallas Bag Drop',
    },
    {
      value: 'Wrapper',
      label: 'Wrapper',
    },
    {
      value: 'Wrapper PZ1',
      label: 'Wrapper PZ1',
    },
    {
      value: 'Wrapper PZ2',
      label: 'Wrapper PZ2',
    },
    {
      value: 'Wrapper PZ3',
      label: 'Wrapper PZ3',
    },
    {
      value: 'Wrapper PZ4',
      label: 'Wrapper PZ4',
    },
    {
      value: 'Wrapper PZ5',
      label: 'Wrapper PZ5',
    },
    {
      value: 'Wrapper PZ6',
      label: 'Wrapper PZ6',
    },
    {
      value: 'Wrapper PZ7',
      label: 'Wrapper PZ7',
    },
    
  ];
  
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
          <Box color="white" textAlign="center" fontSize="h4.fontSize" fontWeight="fontWeightRegular" height="80%" width={350} bgcolor="primary.main" boxShadow={4} borderRadius="borderRadius">
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
            <DataGrid rows={rows} columns={columns} autoHeight pageSize={20} onRowClick = {item => {EditRecord(item.row)}} cancelOnEscape = {true}/>
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
