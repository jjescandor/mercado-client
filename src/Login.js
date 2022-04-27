import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from '@mui/material/Button';
import './Header.css'

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated)
    return <Button Button id="loginBtn" variant="contained" onClick={() => loginWithRedirect()}> Log In</Button >;
};

export default LoginButton;
