import React from 'react'
import { connect } from 'react-redux'

import {signIn,signOut} from '../actions'
import history from '../history'

class GoogleAuth extends React.Component {

    componentDidMount = () =>{
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '437415933958-07v75j7vj4n6ospe18eiqqthgqp0mnr7.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.userId = this.auth.currentUser.get().getId();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = isSignedIn =>{
        if(isSignedIn){
            this.props.signIn(this.userId)
        }
        else{
            this.props.signOut()
        }
    }

    onSignInClick = () =>{
        this.auth.signIn();
        sessionStorage.setItem('authToken',this.userId);
        history.push('/home')
    }

    render(){
        return (
            <button onClick={this.onSignInClick} className="shadow-sm p-2 mb-3 btn btn-light btn-block border">
                    Sign In with Google
                </button>
        )
    }

}

export default connect(null,{signIn,signOut})(GoogleAuth)