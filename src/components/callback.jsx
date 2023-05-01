import React, { useEffect } from 'react';
import auth0 from 'auth0-js';

const Callback = () => {
  useEffect(() => {
    const auth = new auth0.WebAuth({
      domain: 'YOUR_AUTH0_DOMAIN',
      clientID: 'YOUR_AUTH0_CLIENT_ID',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://YOUR_AUTH0_DOMAIN/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile email'
    });

    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        window.location.href = '/';
      } else if (err) {
        console.log(err);
      }
    });
  }, []);

  return (
    <div>Loading...</div>
  );
};

export default Callback;
