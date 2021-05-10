import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EditedPage from './pages/EditedPage';
import RootPage from './pages/RootPage';
import RegisterPage from './pages/RegisterPage';
import PasswordRecoveryPage from './pages/ResetPassword'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'


function App() 
{
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <LoginPage />
                </Route>
                <Route path="/ResetPassword" exact>
                    <PasswordRecoveryPage />
                </Route>
                <ProtectedRoute path="/HomePage" component={HomePage} isAuth={localStorage.getItem('acessToken')}/>
                <ProtectedRoute path="/EditedPage" component={EditedPage} isAuth={localStorage.getItem('acessToken')}/>
                <ProtectedRoute path="/RootPage" component={RootPage} isAuth={localStorage.getItem('acessToken')}/>
                <Route path="/RegisterPage" component={RegisterPage} isAuth={localStorage.getItem('acessToken')}/>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;