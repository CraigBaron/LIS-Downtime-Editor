import React from 'react';
import SignIn from '../components/Signin';


const LoginPage = () =>
{
    window.onload = () => {
        if(localStorage.getItem('accessToken'))
            window.location.href = '/HomePage'
    } 
    return(
      <div>
        <SignIn />
      </div>
    );
};

export default LoginPage;