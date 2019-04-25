import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseInfo: '',
      sub: '',
      error: null,
      report: null,
    };
  }

  handleInput = e => {
    this.setState({
      houseInfo: e.target.value,
    });
  };

  handleSub = e => {
    e.preventDefault();
    this.setState({
      houseInfo: '',
      sub: 'submission was success',
    });
    fetch('/api/houses', {
      method: 'POST',
      body: this.state.houseInfo,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ error: null, report: data });
          console.log(data);
        }
        console.log(data);
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  };

  render() {
    console.count('render');
    const { report } = this.state;

    return (
      <div>
        <h3 style={{ margin: '0.6em', color: 'lightGreen' }}>Form submission</h3>
        <form onSubmit={this.handleSub}>
          <textarea
            onChange={this.handleInput}
            value={this.state.houseInfo}
            style={{
              width: '60%',
              height: '150px',
              margin: '0.6em',
            }}
          />
          <button
            style={{
              display: 'flex',
              margin: '0.6em',
              background: 'lightGreen',
              color: 'white',
              border: 'none',
              textDecoration: 'none',
              padding: '1em',
              borderRadius: '5px',
            }}
            type="submit"
          >
            submit
          </button>
          <br />
          {!!report && <Report report={report} />}
        </form>
      </div>
    );
  }
}
const Report = ({ report }) => (
  <div style={{ padding: '1em', color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>
    valid houses :{report.valid}
    <br />
    invalid houses {report.invalid.length}:
    {report.invalid.map(data => (
      <div>
        messages:<pre>{JSON.stringify(data.errors, null, 2)}</pre>
      </div>
    ))}
  </div>
);
