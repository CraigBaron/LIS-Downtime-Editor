import React from 'react';
import ButtonAppBar from '../components/HomePageNav';
import PendingPageTable from '../components/PendingPageTable'

const PendingPage = () =>
{
    return(
      <div>
        <ButtonAppBar></ButtonAppBar>
        <PendingPageTable></PendingPageTable>
      </div>
    );
};

export default PendingPage;