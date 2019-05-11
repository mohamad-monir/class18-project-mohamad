import React, { Component } from 'react';
import '../style.scss';

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
    console.log(this.state.houseInfo);
    const { report } = this.state;

    return (
      <div className="form-div">
        <div>
          <h3>Form submission</h3>
          <form onSubmit={this.handleSub}>
            <div>
              <div>
                <textarea onChange={this.handleInput} value={this.state.houseInfo} />
              </div>
              <div>
                <button type="submit">submit</button>
              </div>
            </div>
            <br />
            {!!report && <Report report={report} />}
          </form>
        </div>
      </div>
    );
  }
}
const Report = ({ report }) => (
  <div>
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
