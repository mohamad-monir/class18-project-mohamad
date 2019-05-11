import React, { Component } from 'react';
import '../style.scss';

export default class HouseOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      error: '',
      total: '',
      pageSize: '',
      searchCriteria: {
        price_min: 0,
        price_max: 1000000,
        location_city: '',
        order: 'location_country_asc',
        page: 1,
      },
    };
  }

  componentDidMount() {
    const params = this.props.location.search
      .replace(/^\?/, '')
      .split('&')
      .filter(el => el.length)
      .map(pair => pair.split('='))
      .reduce((params, [name, value]) => {
        params[name] = value;
        return params;
      }, {});

    this.setState(
      {
        searchCriteria: {
          ...this.state.searchCriteria,
          ...params,
        },
      },
      this.fetchHouses,
    );
  }

  fetchHouses = (updateUrl = false) => {
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
    if (updateUrl) {
      this.props.history.replace(this.props.location.pathname + `?` + queryString);
    }
    return fetch(`/api/houses?${queryString}`)
      .then(res => res.json())
      .then(housesList => {
        console.log(housesList);
        this.setState({
          houses: housesList.item,
          total: housesList.total,
          pageSize: housesList.pageSize,
          error: housesList.error,
        });
      })
      .catch(err => {
        this.setState({ error: err });
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
      () => this.fetchHouses(true),
    );
  };

  render() {
    console.log(this.state.houses);
    const {
      houses,
      error,
      pageSize,
      total,
      searchCriteria: { price_min, price_max, location_city, order, page },
    } = this.state;

    const pages = Math.ceil(total / pageSize);
    return (
      <div className="contribute-div">
        <form>
          <label>Price-min:</label>
          <select name="price_min" value={this.state.price_min} onChange={this.handleChange}>
            <option value="0">{price_min} </option>
            <option value="50000">50000</option>
            <option value="100000">100000</option>
            <option value="150000">150000</option>
          </select>

          <label>price-max:</label>
          <select name="price_max" value={this.state.price_max} onChange={this.handleChange}>
            <option value="0">{price_max}</option>
            <option value="60000">60000</option>
            <option value="150000">150000</option>
            <option value="1000000">1000000</option>
          </select>

          <label>City:</label>
          <select name="location_city" value={location_city} onChange={this.handleChange}>
            <option value="">select city</option>
            <option value="Baghdad">Baghdad</option>
            <option value="Rotterdam">Rotterdam</option>
            <option value="Den Haag">Den Haag</option>
          </select>

          <label>Order</label>
          <select name="order" value={order} onChange={this.handleChange}>
            <option value="location_country_asc">country ASC</option>
            <option value="location_country_desc">country DESC</option>
            <option value="price_value_asc">price ASC</option>
            <option value="price_value_desc">price DESC</option>
          </select>
        </form>
        <div>
          <div>
            <div className="page-nu">
              {Array.from({ length: pages || 0 }, (value, index) => (
                <div
                  key={index + 2}
                  onClick={() => {
                    return this.setState(
                      {
                        ...this.state,
                        searchCriteria: {
                          ...this.state.searchCriteria,
                          page: index + 1,
                        },
                      },
                      () => this.fetchHouses(true),
                    );
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            {Array.isArray(houses) ? (
              <ul>
                {houses.map((house, ind) => (
                  <li key={ind + 1}>
                    <div>
                      <p>{house.price_value}</p>
                      <p>{house.link}</p>
                      <p>{house.location_country}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
