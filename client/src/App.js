import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, NavLink } from 'react-router-dom';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
    };
  }

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
            <li>
              <NavLink className="navlink" to="/housesList">
                List of the houses
              </NavLink>
            </li>
            <li>
              <NavLink className="navlink" to="/contributor">
                contributor
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/housesLIst" component={HousesList} />
            <Route path="/contributor" component={Contributor} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
class Home extends Component {
  render() {
    return (
      <div className="homeText">
        <h3>welcome to the website</h3>
      </div>
    );
  }
}
class HousesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
    };
  }
  FetchData = async url => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };
  componentDidMount() {
    this.FetchData('/api/houses').then(data => {
      this.setState({
        houses: data,
      });
    });
  }

  render() {
    return (
      <div>
        <ul className="houseList">
          {this.state.houses.map(house => {
            return (
              <li>
                <p>the house price is {house.price}</p>
                <p>the house is {house.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Contributor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        response: '',
        postPrice: '',
        postDescription: '',
        responseToPost: '',
      },
    };
  }

  handleInput = event => {
    this.setState({
      data: {
        postPrice: event.target.value,
        postDescription: event.target.value,
      },
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const res = await fetch('/api/houses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await res.text();
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div>
        <h3>thank you for you contribution</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="price">price</label>
            <input
              type="number"
              name="price"
              value={this.state.data.postPrice}
              onChange={this.handleInput}
            />
            <label htmlFor="description">description</label>
            <input
              type="text"
              name="description"
              onChange={this.handleInput}
              value={this.state.data.postDescription}
            />
            <button>submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
