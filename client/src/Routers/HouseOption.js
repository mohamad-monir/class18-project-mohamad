import React, { Component } from 'react';

export default class HouseOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      false: null,
      priceOrder: '',
      searchCriteria: {
        price_min: 0,
        price_max: 2000000,
        location_city: '',
        order: 'location_country_asc',
        page: 1,
      },
    };
  }

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    const { searchCriteria } = this.state;
    const queryString = Object.keys(searchCriteria)
      .reduce((query, field) => {
        const val = searchCriteria[field];
        if (val !== null && val !== '') {
          query.push(`${field}=${encodeURI(val)}`);
        }
        return query;
      }, [])
      .join('&');
    return fetch(`/api/houses?${queryString}`)
      .then(res => res.json())
      .then(housesList => {
        console.log(housesList);
        this.setState({
          houses: housesList,
          error: null,
        });
      })
      .catch(() => {
        this.setState({ error: `something is wrong` });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(
      {
        ...this.state,
        searchCriteria: {
          ...this.state.searchCriteria,
          [name]: value,
        },
      },
      this.fetchHouses,
    );
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const {
  //     searchCriteria: { price_min, price_max },
  //   } = this.state;
  //   return price_min > price_max
  //     ? this.setState({
  //         priceOrder: 'check the max',
  //       })
  //     : '';
  // };

  render() {
    console.log(this.state.houses);
    const {
      houses,
      searchCriteria: { price_min, price_max, location_city, order, page },
    } = this.state;
    return (
      <div>
        <form>
          <label>
            price-min
            <select name="price_min" value={this.state.price_min} onChange={this.handleChange}>
              <option value="0">{price_min} </option>
              <option value="50000">50000</option>
              <option value="100000">100000</option>
              <option value="150000">150000</option>
            </select>
          </label>
          <label>
            price-max
            <select name="price_max" value={this.state.price_max} onChange={this.handleChange}>
              <option value="0">{price_max}</option>
              <option value="60000">60000</option>
              <option value="150000">150000</option>
              <option value="200000">200000</option>
            </select>
          </label>
          <label>
            city
            <select
              name="location_city"
              value={this.state.location_city}
              onChange={this.handleChange}
            >
              <option value="">select city</option>
              <option value="baghdad">Baghdad</option>
              <option value="Rotterdam">Rotterdam</option>
            </select>
          </label>
          <label>
            order
            <select name="order" value={order} onChange={this.handleChange}>
              <option value="location_country_asc">country ASC</option>
              <option value="location_country_desc">country DESC</option>
              <option value="price_value_asc">price ASC</option>
              <option value="price_value_desc">price DESC</option>
            </select>
          </label>
        </form>
        <div>
          <ul>
            {houses.map((house, ind) => (
              <li key={ind + 1}>
                <p>{house.price_value}</p>
                <p>{house.link}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
