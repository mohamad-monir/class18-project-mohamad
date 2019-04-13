import React, { Component } from 'react';

export default class HousesList extends Component {
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
    console.log(this.state.houses);
    return (
      <div>
        <ul className="houseList">
          {this.state.houses.map(house => {
            return (
              <li>
                <p>the house located in {house.location_country}</p>
                <p>the city is {house.location_city}</p>
                <p>number of rooms {house.size_rooms}</p>
                <p>the price is {house.price_value}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
