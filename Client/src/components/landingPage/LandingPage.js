import React from 'react'

import SignUp from './SignUp'
import '../../css/landingPage.css'
import Header from '../Header'
import Footer from './Footer'
import Explore from './Explore'

class LandingPage extends React.Component{

    render(){
        return (
            <div>
                <Header navList={["Explore","About us","Log In"]}/>
                <SignUp />
                <Explore />
                <Footer />
            </div>
        )
    }
}

export default LandingPage