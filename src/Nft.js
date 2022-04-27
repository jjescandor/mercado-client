import React from 'react';
import PriceModal from './PriceModal.js'
import { withAuth0 } from '@auth0/auth0-react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '@mui/material/Button'
import { IoMdTrash } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import './Nftcard.css';
import axios from 'axios';


class Nft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nfts: null,
      selected: null,
      show: false,
    }
  }

  componentDidMount() {
    this.getUserNFTs();
  }

  //get user nft

  getUserNFTs = async () => {
    console.log("Getting NFTs");
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: `get`,
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/nft`
      }
      const nftRes = await axios(config)
      this.setState({ nfts: nftRes.data })
    }
  }


  // getUserNFTs = async () => {
  //   const url = `/nft`
  //   const response: NFT[] = await this.APICall(Method.GET, url);
  //   if (response) {
  //     this.setState({
  //       nfts: response,
  //     })
  //   }
  // }


  //delete NFTs

  handleDeleteNft = async (nft) => {
    console.log("Deleting NFTs");
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: `delete`,
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/nft/${nft._id}`,
      }
      await axios(config)
        .then(() => this.getUserNFTs);
    }
  }

  // handleDeleteNft = async (nft: NFT) => {
  //   const url = `/nft/${nft._id}`
  //   await this.APICall(Method.DELETE, url);
  //   this.getUserNFTs();
  // }

  //Update the NFT

  handleUpdate = async (nft) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: `update`,
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/nft/${nft._id}`,
      }
      await axios(config)
        .then(() => this.getUserNFTs);
    }
  }

  // handleUpdate = async (nft: NFT) => {
  //   const url = `/nft/${nft._id}`
  //   await this.APICall(Method.DELETE, url);
  //   this.getUserNFTs();
  // }

  resetNft = () => {
    this.setState({ selected: null });
  }

  onHide = () => {
    this.setState({ show: false });
  }

  render() {


    return (
      <div className="myNFTDiv">
        <h1>My NFTs</h1>
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className='resRow'>
          {this.state.nfts.map((nft, idx) => {
            return (
              <Col key={idx}>
                <Card className='myNftCard'>
                  <Card.Img
                    className='nftImg'
                    src={nft.imageURL}
                    alt={nft.title}
                  />
                  <div id="cardDiv">
                    <div>
                      <h5 id="label">Title:</h5>
                      <h5>&nbsp;{nft.title}</h5>
                    </div>
                    <div>
                      <h5 id="label">Price:</h5>
                      <h5>&nbsp;{nft.price} ETH</h5>
                    </div>
                  </div>
                  <div id="cardBtns">
                    <Button
                      id="dltBtn"
                      variant="contained"
                      disableElevation
                      onClick={() => this.handleDeleteNft(nft)}
                    >
                      <IoMdTrash /> &nbsp; Delete
                    </Button>
                    <Button
                      id="edtBtn"
                      variant="outlined"
                      onClick={() => {
                        this.setState({
                          show: true,
                          selected: nft,
                        });
                      }}
                    >
                      <MdModeEditOutline />
                      &nbsp; Edit Price
                    </Button>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
        {this.state.selected &&
          <PriceModal
            show={this.state.show}
            onHide={this.onHide}
            nft={this.state.selected}
            resetNft={this.resetNft}
            getUserNFTs={this.getUserNFTs}
          />}
      </div >
    )
  }
}


export default withAuth0(Nft);
