import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, NavLink } from 'react-router-dom';
import Home from './Routers/Home';
import Form from './Routers/Form';
import HouseOption from './Routers/HouseOption';
import houses from './HackYourEstate/assets/multiple-houses.jpeg';
import './style.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      colorChange: false,
      className: 'nav-list-inactive',
    };
  }
  handleClick = () => {
    let width = window.matchMedia('(max-width:540px)');
    if (width.matches) {
      if (this.state.colorChange === false) {
        this.setState({
          colorChange: true,
          className: 'nav-list-active',
        });
      } else {
        this.setState({
          colorChange: false,
          className: 'nav-list-inactive',
        });
      }
    }
  };
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="Header">
            <img src={houses} alt="houses-pics" />
            <div className="menu-btn-div">
              <button onClick={this.handleClick} className="menu-btn">
                ☰ Menu
              </button>
            </div>
            <div className={this.state.className}>
              <ul className="nav">
                <li>
                  <NavLink className="navlink" exact to="/">
                    Home
                  </NavLink>
                </li>
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
            </div>
            <div className="headerText">
              <p>
                <span>HackYourEstate</span>
                <br />
                A REST API for finding, uploading and
                <br />
                selling houses
              </p>
            </div>
          </div>

          <div className="webBody">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/form" component={Form} />
              <Route path="/HouseOption" component={HouseOption} />
            </Switch>
          </div>
          <div className="footer">©copy write by HackYourFuture 2019</div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
