import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import Home from './Home';
import Properties from './Properties';
import AddProperty from "./components/property";

export default class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path={"/"} component={Home} />
      <Route exact path={"/properties"} component={Properties} />
      <Route exact path={"/addproperty"} component={AddProperty} />
      </Switch>
      </BrowserRouter>
      </div>
    );
  }
}
