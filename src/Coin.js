import React, { Component } from 'react';
import './Crypto.css';
import { IoIosAddCircle } from 'react-icons/io';
import Button from '@mui/material/Button';

class Coin extends Component {
  render() {
    return (
      <div className="coin-container">
        <div className="coin-row">
          <div className="coin">
            <img src={this.props.image} alt="crypto" />
            <h1>{this.props.name}</h1>
            <p className="coin-symbol">{this.props.symbol}</p>
          </div>
          <div className="coin-data">
            <p className="coin-price">${this.props.price.toLocaleString()} </p>
            <p className="coin-volume">${this.props.volume.toLocaleString()}</p>
            {this.props.priceChange < 0 ? (
              <p className="coin-percent red">
                {this.props.priceChange.toFixed(2)}%
              </p>
            ) : (
              <p className="coin-percent green">
                {this.props.priceChange.toFixed(2)}%
              </p>
            )}
            <p className="coin-marketcap">
              Mkt Cap: ${this.props.marketcap.toLocaleString()}
            </p>
            <Button
              id="addToCryptoWatchList"
              onClick={() => {
                this.props.addToWatchList(this.props.name);
              }}
            >
              <h2>
                <IoIosAddCircle />
              </h2>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Coin;
