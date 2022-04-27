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
        class={"walletDrawer"}
      >
        <h4>Wallet drawer</h4>
        <div className="walletCont">
          {this.props.wallet &&
            this.props.wallet.map((item, idx) => {
              return (
                <div className="itemDiv" key={item._id}>
                  <img id="walletIMG" src={item.imageURL} alt="" />
                  <div>
                    <p>Item: {idx + 1}</p>
                    <h6>{item.title}</h6>
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
                </div>
              );
            })}
        </div>
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
