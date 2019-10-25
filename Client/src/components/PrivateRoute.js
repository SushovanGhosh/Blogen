import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Cookie from 'js-cookie'

export const PrivateRouteToHome = ({ component: Component, ...rest}) => {
    return (
        <Route {...rest}
        render={props =>
            Cookie.get("authToken") ? (
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
            Cookie.get("authToken") ?(
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
