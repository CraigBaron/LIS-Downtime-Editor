import { render } from '@testing-library/react';
import React from 'react';
import {Table, Button} from 'react-bootstrap'
import './styles.css';



function PageTitle()
{

   return(



    <div>
      <br></br>
    <h3><b>LIS-Downtime-Edit</b></h3>
    <div>
    
    <div>
   
      <label>   Shift:   </label>  
      <input placeholder="Shift Number"></input>   <Button variant="primary" size="sm">
        Go
      </Button>  

      <label >   Date:   </label>  
      <input placeholder="MM/DD/YYYY" ></input>   <Button variant="primary" size="sm">
        Go
      </Button>  


      <label>   Machine:   </label>
      <input placeholder="Machine Number"></input>    <Button variant="primary" size="sm">
        Go
      </Button>


      </div>


    </div>
    <Table responsive>
  <thead>
    <tr>
      <th>#</th>
      {Array.from({ length: 12 }).map((_, index) => (
        <th key={index}>Table heading</th>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {Array.from({ length: 12 }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>2</td>
      {Array.from({ length: 12 }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>3</td>
      {Array.from({ length: 12 }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
  </tbody>
</Table>
  </div>
        
   );
};

export default PageTitle;