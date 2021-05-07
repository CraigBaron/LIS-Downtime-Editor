import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button} from '@material-ui/core'
import {useState} from 'react'
import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'LineID', headerName: 'LineID', width: 130 },
    { field: 'Machine', headerName: 'MachineID', width: 130 },
    { field: 'ComponentID', headerName: 'ComponentID', width: 130 },
    { field: 'StartDateTime', headerName: 'StartTime', width: 250 },
    { field: 'EndDateTime', headerName: 'EndTime', width: 250 },
    { field: 'Comments', headerName: 'Comments', width: 130 },
    { field: 'DurationTotalMinutes', headerName: 'Duration', width: 130 },
    { field: 'Secondarypk', headerName: 'Shift', width: 130 },
    { field: 'Reason', headerName: 'Reason', width: 130 },
    { field: 'Status', headerName: 'Status', width: 130 },
  ];
  
  function EditedTable() {
    const [rows, setrows] = useState([])
    var DisplayRecords;
    window.onload = DisplayRecords = async event => 
        {
            const record = [];
            let temp
            await axios.get('http://localhost:5000/editedRecords')
            .then((response) => {
              console.log(response.data[0]);
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
                      setrows(record)
                    }
            }, (error)=> {
              console.log(error);
            });
            
        };
    
    return (
      <div>
      <div><br></br><h3>Edited Records</h3></div>
      
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={20}/>
      </div>
      </div>
    );
  }export default EditedTable;