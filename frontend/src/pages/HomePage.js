import React from 'react';
import DataTable from '../components/HomePageTable';
import ButtonAppBar from '../components/HomePageNav';
const HomePage = () =>
{
    return(
      <div>
        <ButtonAppBar></ButtonAppBar>
        <DataTable></DataTable>
      </div>
    );
};

export default HomePage;