import './Crypto.css';
import Coin from './Coin';
import React, { Component } from 'react';



class Crypto extends Component {

    render() {
        const filteredCoins = this.props.coins?.filter(coin =>
            coin.name.toLowerCase().includes(this.props.search.toLowerCase()))
        return (
            <div className="coin-app" >
                {this.props.coins &&
                    filteredCoins.map((coin, idx) => {
                        return (
                            <Coin
                                key={idx}
                                name={coin.name}
                                price={coin.current_price}
                                image={coin.image}
                                volume={coin.total_volume}
                                symbol={coin.symbol}
                                priceChange={coin.price_change_percentage_24h}
                                marketcap={coin.market_cap}
                                addToWatchList={this.props.addToWatchList}
                            />
                        )
                    })
                }
            </div >
        );
    }
}

export default Crypto;
