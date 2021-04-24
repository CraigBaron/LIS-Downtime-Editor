import React from 'react';
import ButtonAppBar from '../components/HomePageNav';
import EditedPageTable from '../components/EditedPageTable'

const EditedPage = () =>
{
    return(
      <div>
        <ButtonAppBar></ButtonAppBar>
        <EditedPageTable></EditedPageTable>
      </div>
    );
};

export default EditedPage;