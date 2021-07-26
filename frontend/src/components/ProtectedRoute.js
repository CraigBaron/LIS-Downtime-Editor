import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import {config, refreshToken, buildPath} from './config'

class ProtectedRoute extends React.Component {

    constructor (props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            isLoggedIn: false
        };
    }
    componentDidMount(){
            axios.post(buildPath('users/pageRequest'),
            {
              refreshToken : refreshToken()
            },config())
            .then((response) => {
              if(response.data.accessToken){
                localStorage.setItem('accessToken', response.data.accessToken)  
              }
              if(response.data.isAuth)
                    this.setState(() => ({ isLoading: false, isLoggedIn: true}));
            
            }, (error) => {
              this.setState(() => ({ isLoading: false, isLoggedIn: false}));
              console.log(error);
            });
         
    }

    render(){

        return this.state.isLoading ? null :
            this.state.isLoggedIn ?
            <Route path={this.props.path} component={this.props.component} exact={this.props.exact} /> :
            <Redirect to={{pathname: '/', state: {from: this.props.location} }}/>
    }
}

export default ProtectedRoute;