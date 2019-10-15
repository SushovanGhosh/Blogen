import React from 'react'
import { Router, Switch } from 'react-router-dom'

import history from '../history'
import LandingPage from './landingPage/LandingPage'
import HomePage from './HomePage/HomePage'
import { PrivateRouteToHome,PrivateRouteToLogin } from './PrivateRoute'

class App extends React.Component{

    render(){
        return(
            <div>
                <Router history={history}>
                    <div>
                        <Switch>
                            <PrivateRouteToLogin path='/' exact component={LandingPage}/>
                            <PrivateRouteToHome path='/home' exact component={HomePage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App