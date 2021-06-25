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
                <ProtectedRoute path="/HomePage" component={HomePage} isAuth={localStorage.getItem('acessToken')}/>
                <ProtectedRoute path="/EditedPage" component={EditedPage} isAuth={localStorage.getItem('acessToken')}/>
                <ProtectedRoute path="/PendingPage" component={PendingPage} isAuth={localStorage.getItem('acessToken')}/>
                <AdminRoute path="/RootPage" component={RootPage} isAuth={localStorage.getItem('acessToken')} privledge={localStorage.getItem('privledge')}/>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;