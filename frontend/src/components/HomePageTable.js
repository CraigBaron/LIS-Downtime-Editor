import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button} from '@material-ui/core'
import {useState} from 'react'
//test
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
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
  const [rows, setrows] = useState([])
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








  return (
    <div>
    <div><br></br><h3>Machine Data</h3></div>
    
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection />
    </div>
    </div>
  );
}export default DataTable;