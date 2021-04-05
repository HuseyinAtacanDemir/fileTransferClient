import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login-page';
import NoMatch from './pages/NoMatch';

import './assets/_base.scss'

const App = () => {

  const public_ip = process.env.REACT_APP_BASE_URL

  const [token, setToken] = useState("");

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={() => {

      return (
        token
          ? <Component token={token} public_ip={public_ip} />
          : <Redirect to='/login' />
      )
    }} />
  )

  return (
    <Router>
      <Navbar props={{ token, setToken }} />

      <Switch>

        <Route path="/login">
          <LoginPage props={{ setToken, public_ip }} />
        </Route>

        <PrivateRoute path='/dashboard' props={{ token, public_ip }} component={Dashboard} />
        <>
          <NoMatch />
        </>
      </Switch>
    </Router>

  )
}

export default App
