import React from 'react'
import { SubmissionError,Field,reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { baseRequest } from '../../api/blogenService'
import history from '../../history'
import { signIn, } from '../../actions'
import Modal from '../Modal'
import GoogleAuth from '../GoogleAuth'

class Login extends React.Component{

    renderFormFields = ({input,placeholder,meta,type}) =>{
        const invalid = meta.error && meta.touched ? 'is-invalid':''
        return (
            <div className="form-group">
                <input {...input} className={`form-control ${invalid}`} placeholder={placeholder} type={type} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }

    renderError = ({error,touched}) =>{
        if(error && touched){
            return <div className="invalid-feedback">{error}</div>

        }
    }

    renderTextboxes(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onLogin)}>
                {this.props.error && <div className="ui error message">{this.props.error}</div>}
                <Field name="usernameOrEmail" component={this.renderFormFields} placeholder="Email" />
                <Field name="password" component={this.renderFormFields} placeholder="Password" type="password" />
                {this.renderActions("btn btn-primary btn-block",'Log In')}
            </form>
        )
    }

    renderActions = (style,buttonName) =>{
        return(
            <button className={style}>
                {buttonName}
            </button>
        )
    }

    onLogin = formValues =>{
        return baseRequest.post('/api/auth/signin',formValues)
        .then(response=>{
            this.props.signIn(response.data.username)
            console.log(response.data.accessToken)
            sessionStorage.setItem('authToken',response.data.accessToken)
            console.log(sessionStorage.getItem('authToken'))
            sessionStorage.setItem('userId',response.data.username)
            history.push('/home')
            
        })
        .catch(error=>{
            const {message} = error.response.data
            if(message==="Bad credentials"){
                console.log("hi")
                throw new SubmissionError({_error:"Invalid username/password"})
            }
        })
    }

    render(){
        
        return (
            <Modal id="loginModal" headerStyle="text-body" title="Log In to Your Blogen Account!" 
            actions={()=>this.renderActions("shadow-sm p-2 mb-3 btn btn-light btn-block border",'Continue with Google')} 
            textboxes={()=>this.renderTextboxes()}>
                <GoogleAuth />
            </Modal>
        )
    }
}

const validate = formValues =>{

    const error = {}
    if(!formValues.usernameOrEmail || formValues.usernameOrEmail.trim().length === 0){
        error.usernameOrEmail = "Please enter an email/username"
    }
    if(!formValues.password || formValues.password.trim().length === 0){
        error.password = "Please enter the password"
    }
    return error
}

export default connect(null,{signIn})(reduxForm({
    form: 'Login',
    validate
})(Login))