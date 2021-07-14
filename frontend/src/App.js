import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EditedPage from './pages/EditedPage';
import RootPage from './pages/RootPage';
import PendingPage from './pages/PendingPage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() 
{
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <LoginPage />
                </Route>
                <ProtectedRoute path="/HomePage" component={HomePage} exact={true} />
                <ProtectedRoute path="/EditedPage" component={EditedPage} exact={true}/>
                <ProtectedRoute path="/PendingPage" component={PendingPage} exact={true}/>
                <ProtectedRoute path="/RootPage" component={RootPage} exact={true}/> 
                <Redirect to="/"/>
            </Switch>
        </Router>
    );
}

export default App;