import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
    const {
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const logoutWithRedirect = () =>
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            }
        });

    return (
        <>
            {
                !isAuthenticated
                && <button onClick={() => loginWithRedirect()}>Login</button>
            }
            {
                isAuthenticated
                && <button onClick={() => logoutWithRedirect()}>Logout</button>
            }
        </>
        
    );
};

export default Login;