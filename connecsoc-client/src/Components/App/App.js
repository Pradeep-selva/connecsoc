import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import './App.css';

import Navbar from '../Navbar/Index'
import Home from '../../Pages/Home'
import Login from '../../Pages/Login'
import Signup from '../../Pages/Signup'

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


const App = () =>
  <MuiThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <div className="container">
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </div>
        </Switch>
      </Router>
    </div>
  </MuiThemeProvider>


export default App;
