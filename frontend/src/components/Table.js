import React from 'react';
import { Container, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const data = [
    {   
        id: 1, 
        uniqueid: '2756', 
        machine: 'PACKER',
        lineid:  '1',
    },
    {   
        id: 2, 
        uniqueid: '5432', 
        machine: 'PALLETIZER',
        lineid:  '1',
    },


];

const columns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'LineID',
    selector: 'lineid',
    sortable: true,
  },
  {
    name: 'MachineID',
    selector: 'machineid',
    sortable: true,
  },
  {
    name: 'ComponentID',
    selector: 'componentid',
    sortable: true,
  },
  {
    name: 'StartTime',
    selector: 'starttime',
    sortable: true,
  },
  {
    name: 'EndTime',
    selector: 'endtime',
    sortable: true,
  },
  {
    name: 'Reason',
    selector: 'reason',
    sortable: true,
  },
  {
    name: 'Duration',
    selector: 'duration',
    sortable: true,
  },
  {
    name: 'Shift',
    selector: 'shift',
    sortable: true,
  },
  {
    name: 'Approved',
    selector: 'approved',
    sortable: true,
  },
];

const handleChange = (state) => {
  // You can use setState or dispatch with something like Redux so we can use the retrieved data
  console.log('Selected Rows: ', state.selectedRows);
};



function Table() {
  
    
    
    return(

        <div>
            <Container>
                <Row>
        <DataTable
        title="Records"
        columns={columns}
        data={data}
        selectableRows // add for checkbox selection
        Clicked
        selected={handleChange}
        
      />
      </Row>
      </Container>
        </div>
     );
  
  
};
export default Table;
