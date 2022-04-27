import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import './Header.css';

class Home extends React.Component {
  render() {
    return (
      <Nav className="navBar">
        <Nav.Item>
          <Nav.Link href="/">
            <Image src="https://res.cloudinary.com/dxg5jg10h/image/upload/v1650823292/M-8_syklrg.png" alt="logo" id="storeLogo" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="aboutUsMenu" href="/about"><h4>About Us</h4></Nav.Link>
        </Nav.Item>
        <Nav.Item className="separator" />
        {this.props.auth0.isAuthenticated &&
          <>
            <Nav.Item>
              <Profile handleGetAllNft={this.props.handleGetAllNft} />
            </Nav.Item>
          </>
        }
      </Nav>
    );
  }
}

export default withAuth0(Home);
