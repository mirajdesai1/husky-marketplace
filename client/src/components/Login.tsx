import React, { useCallback, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function Login() {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  const onLogin = useCallback(async () => {
    console.log('in on login');
    loginWithRedirect();

  }, [loginWithRedirect]);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log({ token });
        const baseURL = 'http://localhost:8081';
        const axiosInst = axios.create({ baseURL });
        const userObj = await axiosInst.post(
          '/api/profile',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        return userObj;
      } catch (e: any) {
        if (e.error === 'login_required') {
          loginWithRedirect();
        }
        if (e.error === 'consent_required') {
          loginWithRedirect();
        }
        throw e;
      }
    };

    if (isAuthenticated) {
      fetchTokenAndUser()
        .then((resp) => console.log({ resp }))
        .catch((e) => console.log(e));
    }
  }, [getAccessTokenSilently, loginWithRedirect, isAuthenticated]);

  console.log({ isAuthenticated });
  return (
    <>
      {!isAuthenticated && <button onClick={onLogin}>Login</button>}
      {isAuthenticated && (
        <button onClick={() => logoutWithRedirect()}>Logout</button>
      )}
    </>
  );
}

export default Login;
