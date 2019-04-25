import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, NavLink } from 'react-router-dom';
//import Contributor from './Routers/contributor';
import Home from './Routers/Home';
//import HousesList from './Routers/HouseList';
import Form from './Routers/form';
import './index.css';
import HouseOption from './Routers/HouseOption';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul className="nav">
            <li>
              <NavLink className="navlink" exact to="/">
                Home
              </NavLink>
            </li>
            {/* <li>
              <NavLink className="navlink" to="/housesList">
                List of the houses
              </NavLink>
            </li> */}
            <li>
              <NavLink className="navlink" to="/form">
                Form
              </NavLink>
            </li>
            <li>
              <NavLink className="navlink" to="/HouseOption">
                select
              </NavLink>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path="/housesLIst" component={HousesList} /> */}
            <Route path="/form" component={Form} />
            <Route path="/HouseOption" component={HouseOption} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
