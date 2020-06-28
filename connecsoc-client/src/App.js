import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'


class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
