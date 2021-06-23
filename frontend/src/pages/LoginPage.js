import React from 'react';
import SignIn from '../components/Signin';


const LoginPage = () =>
{
    /* window.onload = () => {
        if(localStorage.getItem('acessToken'))
            window.location.href = '/HomePage'
    } */
    return(
      <div>
        <SignIn />
      </div>
    );
};

export default LoginPage;