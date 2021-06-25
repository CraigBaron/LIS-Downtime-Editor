import React from 'react';
import DataTable from '../components/HomePageTable';
import ButtonAppBar from '../components/HomePageNav';
import BottomAppBar from '../components/BottomAppBar';




const HomePage = () =>
{
    return(
      <div>
        <ButtonAppBar></ButtonAppBar>
        <DataTable></DataTable>
        <BottomAppBar></BottomAppBar>
      </div>
    );
};

export default HomePage;