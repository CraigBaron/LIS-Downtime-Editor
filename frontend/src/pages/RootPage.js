import React from 'react';
import ButtonAppBar from '../components/HomePageNav';
import RegisterTable from '../components/RegisterPageTable';
const RootPage = () =>
{
    return(
        <div>
                <ButtonAppBar></ButtonAppBar>
                <RegisterTable></RegisterTable> 
        </div>
    );
};

export default RootPage;