import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EditedPage from './pages/EditedPage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
function App() 
{
      
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <LoginPage />
                </Route>
                <Route path="/HomePage" exact>
                    <HomePage />
                </Route>
                <Route path="/EditedPage" exact>
                    <EditedPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
      );

}

export default App;
