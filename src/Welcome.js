
import React from 'react';
import './Welcome.css';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './Login';
import ReactLoading from 'react-loading';

class Welcome extends React.Component {

    componentDidMount() {
        console.log("Welcome");
    }


    render() {

        const {
            isLoading
        } = this.props.auth0

        if (isLoading) {
            return (
                <div id="lodingDiv">
                    <ReactLoading id="loading" type={"spokes"} color={"blue"} height={667} width={375} />
                </div>
            )
        }

        return (
            <div className="welcomeCont">
                {!this.props.auth0.isAuthenticated &&
                    <div className="welcomeDiv">
                        <div>
                            <h1 id="welcomeH1">Welcome to Mercado</h1>
                            <LoginButton />
                        </div>
                        <div className="explanation">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withAuth0(Welcome);