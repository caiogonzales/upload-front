import React, { Component } from 'react';
import Home from './views/home'
import Registrados from './views/registrados'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {


  render(){
    
    return (
      <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/registrados">
          <Registrados />
        </Route>
      </Switch>
      </Router>
    )
  }
}

export default App;
