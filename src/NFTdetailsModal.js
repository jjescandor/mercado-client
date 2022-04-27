import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactStars from 'react-rating-stars-component';
import './Modal.css';

class NFTdetailsModal extends Component {


    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton className='modalHeader'>
                    <Modal.Title id="modalTitle">{this.props.nft.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBody'>
                    <div>
                        <ReactStars
                            value={4.5}
                            count={5}
                            onChange={this.changeRating}
                            size={24}
                            activeColor='#FFFF00'
                        />
                        <p>Created by:</p>
                        <p>Creator here</p>
                        <p>Price:</p>
                        <p>{this.props.nft.price}  ETH</p>
                        <p>Description:</p>
                        <p>{this.props.nft.description}</p>
                        <Button
                            id="addModalBtn"
                            onClick={""}
                        >
                            Add to Cart
                        </Button>
                    </div>
                    <img id="modalImg" src={this.props.nft.imageURL} alt="" />
                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button
                        id="closeModalBtn"
                        onClick={this.props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default NFTdetailsModal;