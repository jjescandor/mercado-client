import './Nftcarousel.css';
import React, { Component } from 'react';
import NFTdetailsModal from './NFTdetailsModal';
import Carousel from 'react-elastic-carousel';
import { Card } from 'react-bootstrap';

class NFTCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNft: null,
      show: false
    }
  }

  onHide = () => {
    this.setState({ show: false });
  }

  handleClick = (nft) => {
    this.setState({
      selectedNft: nft,
      show: true,
      onHide: this.onHide
    })
  }

  render() {
    const breakpoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 },
    ];

    return (
      <>
        <div className="nftDiv">
          {this.props?.nftArr &&
            <Carousel className='nftCarousel' breakPoints={breakpoints}>
              {this.props?.nftArr.map((nft) => (
                <Card key={nft._id} className='nftCard'>
                  <Card.Img
                    className='nftImgC'
                    src={nft.imageURL}
                    alt={nft.title}
                    onClick={() => this.handleClick(nft)}
                  />
                  <div id="cardDiv">
                    <div>
                      <h6 id="label">Title:</h6>
                      <h6>&nbsp;{nft.title}</h6>
                    </div>
                    <div>
                      <h6 id="label">Price:</h6>
                      <h6>&nbsp;{nft.price} ETH</h6>
                    </div>
                  </div>
                </Card>
              ))}
            </Carousel>
          }
        </div>

        {this.state.selectedNft &&
          <NFTdetailsModal
            show={this.state.show}
            nft={this.state.selectedNft}
            onHide={this.onHide}
          />}
      </>
    );
  }
}

export default NFTCarousel;
