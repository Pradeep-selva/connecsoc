import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import './App.css';

import Navbar from '../Navbar/Index'
import Home from '../../Pages/Home'
import Login from '../../Pages/Login'
import Signup from '../../Pages/Signup'
import AuthRoute from '../../utils/AuthRoute'
import UserPage from '../../Pages/UserPage'

import { Provider } from 'react-redux'
import store from '../../redux/store'
import { SET_AUTHENTICATED } from '../../redux/types'
import { logoutUser, getUser } from '../../redux/actions/userActions'

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
      main: "#3ca4b0",
      dark: "#087980",
      contrastText: "#f2f5f5"
    }
  }
})

const token = localStorage.AuthToken;

if (token) {
  const decoded = jwtDecode(token)

  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED
    })
    axios.defaults.headers.common["Authorization"] = token
    store.dispatch(getUser())
  }
}


const App = () =>
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
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
              />
              <AuthRoute
                exact path='/signup'
                component={Signup}
              />
              <Route
                exact path='/users/:handle'
                component={UserPage}
              />
              <Route
                exact path='/user/:handle'
                component={UserPage}
              />
              <Route
                exact path='/users/:handle/posts/:postId'
                component={UserPage}
              />
            </div>
          </Switch>
        </Router>
      </div>
    </Provider>
  </MuiThemeProvider>


export default App;
