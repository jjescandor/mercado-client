import React, { Component } from 'react';
import './WatchList.css';
import { withAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import { AiOutlineMinusCircle } from "react-icons/ai";
import Button from '@mui/material/Button';
import axios from 'axios';

class WatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinsWatchList: [],
            coins: null,
            myCoins: null
        }
    }


    componentDidMount() {
        this.handleGetCryptos()
        this.getCoinsWatchList();
    }

    getCoinsWatchList = async () => {
        console.log("Getting watchlist");
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;
            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: `get`,
                baseURL: `${process.env.REACT_APP_HEROKU_URL}/crypto`
            }
            const coinRes = await axios(config)
            this.setState({ myCoins: coinRes.data })
            this.handleGetCryptos(coinRes.data);
        }
    }

    handleGetCryptos = async (coinRes) => {
        await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => {
                this.setState({ coins: res.data });
                this.filterCoins(coinRes, res.data);
            })
            .catch(error => console.log(error.message));
    }

    removeFromWatchlist = async (coinName) => {
        const deleteCoin = this.state.myCoins.filter((coin) => coin.name === coinName);
        const { _id } = deleteCoin[0];
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res._raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: `delete`,
                baseURL: `http://localhost:3001`,
                url: `/crypto/${_id}`
            }
            await axios(config);
            this.handleGetCryptos()
            this.getCoinsWatchList();
        }
    }


    filterCoins = (coinRes, res) => {
        const arr = [];
        if (coinRes) {
            for (let coin of coinRes) {
                arr.push(coin.name);
            }
        }
        let crypto = res.filter(val => arr.includes(val.name));
        this.setState({ coinsWatchList: crypto });
    }

    render() {
        const {
            isLoading
        } = this.props.auth0

        if (isLoading) {
            return (
                <div>
                    <ReactLoading type={"spokes"} color={"blue"} height={667} width={375} />
                </div>
            )
        }


        return (
            <div className="watchLstCont">
                <h1>My Crypto Watchlist</h1>
                {this.state.coinsWatchList.length > 0 &&
                    this.state.coinsWatchList.map((coin, idx) => {
                        return (
                            <div key={idx} className='coin-container' >
                                <div className='coin-row'>
                                    <div className='coin'>
                                        <img src={coin.image} alt='crypto' />
                                        <h1>{coin.name}</h1>
                                        <p className="coin-symbol" >{coin.symbol}</p>
                                    </div>
                                    <div className="coin-data">
                                        <p className="coin-price">${coin.current_price.toLocaleString()} </p>
                                        <p className="coin-volume">${coin.total_volume.toLocaleString()}</p>
                                        {coin.price_change_percentage_24h < 0 ? (
                                            <p className="coin-percent red">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                                        ) : (
                                            <p className="coin-percent green">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                                        )}
                                        <p className="coin-marketcap">
                                            Mkt Cap: ${coin.market_cap.toLocaleString()}
                                        </p>
                                        <Button
                                            id="addToCryptoWatchList"
                                            onClick={() => {
                                                this.removeFromWatchlist(coin.name)
                                            }}
                                        ><h2><AiOutlineMinusCircle /></h2>
                                        </Button>
                                    </div>
                                </div>
                            </div>)
                    })}
            </div>
        )
    }


}

export default withAuth0(WatchList);
