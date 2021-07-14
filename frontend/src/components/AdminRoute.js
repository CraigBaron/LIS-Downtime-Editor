import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AdminRoute({isAuth, privledge, component: Component, ...rest}){
    return <Route {...rest} render={(props)=>{
        
        if(isAuth && privledge === "3"){
        return <Component />
        }
        else{
            return <Redirect to={{pathname: '/', state: {from: props.location} }}/>
        }
    }}/>
}
export default AdminRoute;