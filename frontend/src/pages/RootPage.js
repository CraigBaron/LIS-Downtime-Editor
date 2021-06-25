import React from 'react';
import ButtonAppBar from '../components/HomePageNav';
import Tabs from '../components/Tabs';
import BottomAppBar from '../components/BottomAppBar';

const RootPage = () =>
{
    return(
        <div>
                <ButtonAppBar></ButtonAppBar>
                <Tabs></Tabs>
                <BottomAppBar></BottomAppBar>
        </div>
    );
};

export default RootPage;