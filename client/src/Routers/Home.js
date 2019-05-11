import React, { Component } from 'react';
import '../style.scss';
import searchIcon from '../HackYourEstate/assets/seach-house-icon.png';
import uploadData from '../HackYourEstate/assets/upload-data-icon.svg';
import contribute from '../HackYourEstate/assets/contribute.png';
import easyToUse from '../HackYourEstate/assets/easy-to-use.png';
import openSource from '../HackYourEstate/assets/open-source.png';
import catalog from '../HackYourEstate/assets/catalog.png';
import mysql from '../HackYourEstate/assets/mysql-icon.svg';
import nodeJs from '../HackYourEstate/assets/nodejs-icon.png';
import reactJs from '../HackYourEstate/assets/reactjs-icon.png';

export default class Home extends Component {
  render() {
    return (
      <div className="home-content">
        <div className="item-home-align">
          <div className="feature-icons">
            <p id="feature-title">Features</p>
            <div className="img-feature-div">
              <div className="column">
                <img src={searchIcon} alt="search-icon" />
                <p>search for houses</p>
              </div>
              <div className="column">
                <img src={uploadData} alt="upload-data-icon" />
                <p>upload house data</p>
              </div>

              <div className="column">
                <img src={contribute} alt="contribute-icon" />
                <p>contribute to API</p>
              </div>
            </div>
          </div>
        </div>
        <div className="benefit-icons">
          <h2 id="benefit-title">Benefit</h2>
          <div className="benefit-items-align">
            <div className="column-benefit-icons">
              <img src={easyToUse} alt="easy-to-use-icon" />

              <img src={openSource} alt="open-source-icon" />

              <img src={catalog} alt="catalog-icon" />
            </div>
            <div className="column-benefit-para">
              <p>
                <strong>open-source</strong>
                <br />
                feel like the API incomplete? feel free to contribute!
              </p>
              <p>
                <strong>easy to find</strong>
                <br />
                find or upload in matter of click
              </p>
              <p>
                <strong>extensive catalog</strong>
                <br />
                find your dream house in no time
              </p>
            </div>
          </div>
        </div>
        <div className="written-icons">
          <h2>written in ...</h2>
          <div className="written-item-div">
            <img src={mysql} alt="mysql-icon" />
            <img src={nodeJs} alt="nodeJs-icon" />
            <img src={reactJs} alt="reactJs-icon" />
          </div>
        </div>
        <div className="beforeFooter">
          <div className="wrapper">
            <h2>what are you waiting for?</h2>

            <p>find your next house, or contribute!</p>
          </div>
        </div>
      </div>
    );
  }
}
