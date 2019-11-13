import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'

import '../css/header.css'
import Login from './landingPage/Login'
import { signIn, signOut } from '../actions'
import history from '../history'

class Header extends React.Component {

    // renderLogin = () =>{
    //     if(this.state.isLoggedIn){
    //         console.log("hi")
    //         return <Login />
    //     }
    //     else{
    //         return <a href="#home" onClick={this.login} data-toggle="modal" data-target="#loginModal" className="nav-link">Login</a>
    //     }
    // }

    componentDidMount = () => {
        if (Cookie.get('authToken')) {
            this.props.signIn(Cookie.get('userId'))
        }
        else {
            this.props.signOut()
        }

    }

    onLogout = () => {
        Cookie.remove('authToken')
        Cookie.remove('userId')
        // sessionStorage.removeItem('authToken')
        // sessionStorage.removeItem('userId')
        this.props.signOut()
        history.push('/')
    }

    renderLogInButton = () => {
        if (this.props.auth.isSignedIn) {
            return <button onClick={this.onLogout} className="nav-link btn btn-link">Log out</button>
        }
        return <button data-toggle="modal" data-target="#loginModal" className="nav-link btn btn-link">Login</button>
    }

    renderNavlist = () => {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <button href="#home" className="nav-link btn btn-link">Explore</button>
                </li>
                <li className="nav-item">
                    <button href="#home" className="nav-link btn btn-link">About Us</button>
                </li>
                <li className="nav-item">
                    {this.renderLogInButton()}
                </li>
            </ul>
        )
    }

    renderSearchBar = () => {
        return(
            <form class="form-inline my-lg-0 ml-auto">
                {/* <select name="search"></select> */}
                <input class="form-control mr-xs-2 search-box input-lg" type="text" placeholder="Search"/>
                <button class="btn fas fa-search text-white my-2 my-sm-0" type="submit"></button>
            </form>
        )
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <Link to='/home' className="navbar-brand">Bloggen</Link>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            {this.renderSearchBar()}
                            {this.renderNavlist()}
                            <Login />
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, { signIn, signOut })(Header)