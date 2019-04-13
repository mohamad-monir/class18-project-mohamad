import React, { Component } from 'react';

export default class Contributor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      postPrice: '',
      postDescription: '',
      responseToPost: '',
      greeting: '',
      data: '',
    };
  }

  handleInputPrice = event => {
    this.setState({
      postPrice: event.target.value,
    });
  };
  handleInputDescription = event => {
    this.setState({
      postDescription: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      postPrice: '',
      postDescription: '',
      data: '',
      greeting: 'thanks',
    });
    fetch('/api/houses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: this.state.postPrice,
        description: this.state.postDescription,
      }),
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          responseToPost: data,
        });
      });
  };

  render() {
    console.log(this.state.responseToPost);
    return (
      <div>
        <h3>thank you for your contribution</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="price">price</label>
            <input
              type="number"
              name="price"
              value={this.state.postPrice}
              onChange={this.handleInputPrice}
            />
            <label htmlFor="description">description</label>
            <input
              type="text"
              name="description"
              onChange={this.handleInputDescription}
              value={this.state.postDescription}
            />
            <textarea value={this.state.data} />
            <button>submit</button>
          </form>
        </div>
        <p>{this.state.greeting}</p>
      </div>
    );
  }
}
