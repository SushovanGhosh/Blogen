import React from 'react'
import { Router, Switch } from 'react-router-dom'

import history from '../history'
import LandingPage from './landingPage/LandingPage'
import HomePage from './HomePage/HomePage'
import { PrivateRouteToHome,PrivateRouteToLogin } from './PrivateRoute'
import BlogViewPage from './BlogViewPage/BlogViewPage'
import FilteredBlogsPage from './FilteredBlogsPage/FilteredBlogsPage'
import ProfileViewPage from './ProfileViewPage/ProfileViewPage'

class App extends React.Component{

    render(){
        return(
            <div>
                <Router history={history}>
                    <div>
                        <Switch>
                            <PrivateRouteToLogin path='/' exact component={LandingPage}/>
                            <PrivateRouteToHome path='/home' exact component={HomePage} />
                            <PrivateRouteToHome path='/viewBlog/:id' exact component={BlogViewPage} />
                            <PrivateRouteToHome path='/blogCategory/:category' exact component={FilteredBlogsPage} />
                            <PrivateRouteToHome path='/myprofile' exact component={ProfileViewPage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App