import React from 'react';
import ButtonAppBar from '../components/HomePageNav';
import Tabs from '../components/Tabs';
const RootPage = () =>
{
    return(
        <div>
                <ButtonAppBar></ButtonAppBar>
                <Tabs></Tabs>
        </div>
    );
};

export default RootPage;