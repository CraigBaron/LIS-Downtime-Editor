import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button} from '@material-ui/core'
import {useState} from 'react'
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import {Box} from "@material-ui/core"


var temp;
var i;

const config = {
  headers : {'Authorization' : 'Bearer ' + localStorage.getItem('acessToken')
  }
}
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
            await axios.get('http://localhost:5000/editedRecords', config)
            .then((response) => {
              console.log(response.data[0].length);
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
            }, (error)=> {
              console.log(error);
            });
            
        };

    async function searchRecords(){
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
              "id" : res.recordset[i].UniqueID,
              "pkdowntimeeventid" : res.recordset[i].pkDowntimeEventID,
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
    
    <div>
      <Box marginTop="2%" alignItems="center" display="flex" justifyContent="center">
      <SearchBar style={{width: '20%'}} id = "searchBar" onRequestSearch={searchRecords} placeholder="Search Records..." autoFocus />
      </Box>
    </div>
    <br></br>
    <div style={{ height: 800, width: '100%' }}>
    <div><h3>Edited Records</h3></div>
    <DataGrid  autoHeight rows={rows} columns={columns} rowsPerPageOptions={[5, 10, 20, 50]}/>
    </div>
    </div>
    );
  }export default EditedTable;