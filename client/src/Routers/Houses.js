import React, { Component } from 'react';

export default class Houses extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.houses.map((elem, ind) => {
            return (
              <li key={ind + 1}>
                {elem.price}
                {elem.description}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
