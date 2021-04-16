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
    name: 'UniqueID',
    selector: 'uniqueid',
    sortable: true,
  },
  {
    name: 'Machine',
    selector: 'machine',
    sortable: true,
  },
  {
    name: 'LineID',
    selector: 'lineid',
    sortable: true,
  },
  {
    name: 'StartTime',
    selector: 'starttime',
    sortable: true,
  },
];



function Table() {
  
    
    
    return(

        <div>
            <Container>
                <Row>
        <DataTable
        title="Records"
        columns={columns}
        data={data}
        
      />
      </Row>
      </Container>
        </div>
     );
  
  
};
export default Table;
