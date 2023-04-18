import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
    const {
        user,
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
    
    console.log(user)

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