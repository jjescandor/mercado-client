import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import Home from './Home';
import About from './About';
import Nft from './Nft';
import Header from './Header';
import Crypto from './Crypto';
import WatchList from './WatchList';
import Welcome from './Welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNFT: null,
      walletItem: null,
    };
  }

  componentDidMount() {
    this.handleGetAllNft();
  }

  handleGetAllNft = async () => {
    const config = {
      baseURL: `${process.env.REACT_APP_HEROKU_URL}`,
      method: 'get',
    };
    const res = await axios(config);
    this.setState({ allNFT: res.data });
  };

  createWalletItem = async (item) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'post',
        data: item,
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/wallet`,
      };
      await axios(config);
    }
  };

  addWalletItem = (item) => {
    this.setState({ walletItem: item });
    this.createWalletItem(item);
  };

  render() {
    const { isLoading } = this.props.auth0;

    if (isLoading) {
      return (
        <div id="lodingDiv">
          <ReactLoading
            id="loading"
            type={'spokes'}
            color={'blue'}
            height={667}
            width={375}
          />
        </div>
      );
    }

    return (
      <>
        <Header handleGetAllNft={this.handleGetAllNft} />
        <BrowserRouter>
          <Routes>
            {!this.props.auth0.isAuthenticated ? (
              <Route path="/" element={<Welcome />} />
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <Home
                      allNFT={this.state.allNFT}
                      addWalletItem={this.addWalletItem}
                    />
                  }
                />
                <Route path="crypto" element={<Crypto />} />
                <Route path="nft" element={<Nft />} />
                <Route path="watchlist" element={<WatchList />} />
              </>
            )}
            <Route path="about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default withAuth0(App);
