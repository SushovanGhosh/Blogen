import React from 'react'
import { Router, Switch } from 'react-router-dom'

import history from '../history'
import LandingPage from './landingPage/LandingPage'
import HomePage from './HomePage/HomePage'
import { PrivateRouteToHome,PrivateRouteToLogin } from './PrivateRoute'
import BlogViewPage from './BlogViewPage/BlogViewPage'

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
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App