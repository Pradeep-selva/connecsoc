import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'
import './App.css';

import Navbar from '../Navbar/Index'
import Home from '../../Pages/Home'
import Login from '../../Pages/Login'
import Signup from '../../Pages/Signup'
import AuthRoute from '../../Components/AuthRoute/Index'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6bcf9c",
      main: "#52a178",
      dark: "#20784a",
      contrastText: "#edf2f0"
    },
    secondary: {
      light: "#99dce0",
      main: "#73bbbf",
      dark: "#087980",
      contrastText: "#f2f5f5"
    }
  }
})

let isAuthenticated;
const token = localStorage.AuthToken;

if (token) {
  const decoded = jwtDecode(token)

  if (decoded.exp * 1000 < Date.now()) {
    isAuthenticated = false;
    window.location.href = '/login';
  } else {
    isAuthenticated = true;
  }
}


const App = () =>
  <MuiThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <div className="container">
            <Route
              exact path='/'
              component={Home} />
            <AuthRoute
              exact path='/login'
              component={Login}
              isAuthenticated={isAuthenticated} />
            <AuthRoute
              exact path='/signup'
              component={Signup}
              isAuthenticated={isAuthenticated} />
          </div>
        </Switch>
      </Router>
    </div>
  </MuiThemeProvider>


export default App;
