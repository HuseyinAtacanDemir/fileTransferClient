import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login-page';
import NoMatch from './pages/NoMatch';

import './assets/_base.scss'

const App = () => {

  const [token, setToken] = useState("");

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={() => {
      console.log("token: ", token)
      return (
      token
        ? <Component token={token} />
        : <Redirect to='/login' />
    )}} />
  )

  return (
    <Router>
      <Navbar props={{ token, setToken }} />

      <Switch>
        
        <Route  path="/login">
          <LoginPage props={{ token, setToken }} />
        </Route>

        <PrivateRoute props={{ token }} component={Dashboard} />
        <>
          <NoMatch />
        </>
      </Switch>
    </Router>

  )
}

export default App
