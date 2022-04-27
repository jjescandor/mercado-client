import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import './Modal.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Button from '@mui/material/Button';


class PriceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.nft?.title,
            type: this.props.nft?.type,
            price: this.props.nft?.price,
            imageURL: this.props.nft?.imageURL,
            email: this.props.nft?.email,
            description: this.props.nft?.description
        }
    }
    componentDidMount = () => {
    }

    handlePriceChange = (event) => this.setState({ price: event.target.value });

    handlePriceSubmit = (event) => {
        event.preventDefault();
        this.updatePrice();
    }

    updatePrice = async () => {
        const { _id } = this.props.nft;
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;

            const config = {
                headers: { Authorization: `Bearer ${jwt}` },
                method: 'put',
                baseURL: `${process.env.REACT_APP_HEROKU_URL}/nft/${_id}`,
                data: this.state
            };
            await axios(config)
                .then(() => this.props.getUserNFTs());
            this.props.resetNft();
            this.props.onHide();
        }
    }


    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size='md'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Body id="priceModalBody">
                    <Form id="priceForm" type="submit" onSubmit={this.handlePriceSubmit}>
                        <Form.Label><h4>Enter Price:</h4></Form.Label>
                        <Form.Control
                            id="input"
                            name="price"
                            type="text"
                            value={this.state.price}
                            onChange={this.handlePriceChange} />
                        <Button
                            id="submitBtn"
                            type="submit"
                            variant="contained"
                        >Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer id="priceModalFooter">
                    <Button
                        id="priceCloseBtn"
                        onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default withAuth0(PriceModal);
