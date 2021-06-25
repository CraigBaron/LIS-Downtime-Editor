import React from 'react';
import ButtonAppBar from '../components/HomePageNav';
import EditedPageTable from '../components/EditedPageTable'
import BottomAppBar from '../components/BottomAppBar';

const EditedPage = () =>
{
    return(
      <div>
        <ButtonAppBar></ButtonAppBar>
        <EditedPageTable></EditedPageTable>
        <BottomAppBar></BottomAppBar>
      </div>
    );
};

export default EditedPage;