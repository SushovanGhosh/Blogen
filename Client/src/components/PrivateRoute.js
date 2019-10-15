import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRouteToHome = ({ component: Component, ...rest}) => {
    return (
        <Route {...rest}
        render={props =>
            sessionStorage.getItem("authToken") ? (
                <Component {...rest} {...props} />
            ) : (
                <Redirect
                to={{
                    pathname: "/",
                    state: { from: props.location }
                }} />
            )
        } />
    )
}

export const PrivateRouteToLogin = ({ component: Component, ...rest}) => {
    return (
        <Route {...rest}
        render={props =>
            sessionStorage.getItem("authToken") ?(
                <Redirect
                to={{
                    pathname: "/home",
                    state: { from: props.location }
                }} />
            ):(
                <Component {...rest} {...props} />
            )  
        } />
    )
}
