import React, { Component } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoIosHome } from 'react-icons/io';
import axios from 'axios';
import './Wallet.css';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletItem: null,
    };
  }

  handleDeleteWalletItem = async () => {
    console.log('deleting item');
    const { _id } = this.state.walletItem;
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'delete',
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/wallet/${_id}`,
      };
      await axios(config).then(() => {
        this.props.getUserWallet();
      });
    }
  };

  render() {
    return (
      <Drawer
        open={this.props.showWalletDrawer}
        anchor="right"
        onClose={this.props.hideWalletDrawer}
      >
        <h1>Wallet drawer</h1>

        {this.props.wallet &&
          this.props.wallet.map((item) => {
            return (
              <div>
                <h6>{item.title}</h6>
                <img id="walletIMG" src={item.imageURL} alt="" />
                <h5>Price: {item.price} ETH</h5>
                <button
                  onClick={() => {
                    this.setState({ walletItem: item });
                    this.handleDeleteWalletItem();
                  }}
                >
                  Remove from wallet
                </button>
              </div>
            );
          })}
        <Button href="/">
          <h5>
            <IoIosHome /> &nbsp; Home
          </h5>
        </Button>
      </Drawer>
    );
  }
}

export default Wallet;
