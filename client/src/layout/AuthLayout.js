import React from 'react';
import AuthHeader from "../components/AuthHeader";
import logo from "../assets/logo.png";
const AuthLayouts = ({children}) => {
    return(
        <>
            <AuthHeader
                logoSrc={logo}
            />
            {children}
        </>
    )
}

export default AuthLayouts
