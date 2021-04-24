import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button} from '@material-ui/core'
//test
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'lineid', headerName: 'LineID', width: 130 },
  { field: 'machineid', headerName: 'MachineID', width: 130 },
  { field: 'componentid', headerName: 'ComponentID', width: 130 },
  { field: 'startTime', headerName: 'StartTime', width: 130 },
  { field: 'endTime', headerName: 'EndTime', width: 130 },
  { field: 'reason', headerName: 'Reason', width: 130 },
  { field: 'duration', headerName: 'Duration', width: 130 },
  { field: 'shift', headerName: 'Shift', width: 130 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {

  const DisplayRecords = async event => 
      {
          event.preventDefault();
  
          try
          {    
              const response = await fetch('http://localhost:5000/API/SearchMachine',
                  {method:'POST',headers:{'Content-Type': 'application/json'}});
  
              var res = JSON.parse(await response.text());
              console.log(res);
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
    <Button color="primary" onClick={DisplayRecords}>Display Records</Button>
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection />
    </div>
    </div>
  );
}