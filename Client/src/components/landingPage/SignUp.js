import React from 'react'
import { SubmissionError,Field,reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import _ from 'lodash'

import history from '../../history'
import { signIn } from '../../actions'
import { baseRequest } from '../../api/blogenService'

// import { asyncValidate } from './Vaildations'

class SignUp extends React.Component{


    renderFormFields = ({input,placeholder,meta,type}) =>{
        const invalid = meta.error && meta.touched ? 'is-invalid':''
        console.log(meta)
        return(
            <div className="form-group">
                <input {...input} className={`form-control ${invalid}`} type={type} placeholder={placeholder} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    renderError = ({ error,touched }) =>{

        if(error && touched){
            return(
                <div style={{color:"#fff"}} className="invalid-feedback"><strong>{ error }</strong></div>
            )
        }
    }

    onSignUp = formValues =>{
        return baseRequest.post('/api/auth/signup', {..._.omit(formValues,'confirmPassword')})
        .then(() => {
            this.props.signIn(formValues.username)
            history.push('/home')
        })
        .catch(error=>{
            const {field,message} = error.response.data
            throw new SubmissionError({[field]: message})
        })
        
    }

    render(){
        return(
            <header id="home-section">
                <div className="dark-overlay">
                    <div className="home-inner container">
                        <div className="row">
                            <div className="col-lg-8 d-none d-lg-block">
                                <h1 className="dispaly-4">
                                    <strong>Real Simple: Ideas, Tips </strong> , and Simple Ways to Make 
                                    <strong> Life Even Easier</strong>
                                </h1>
                                <div className="d-flex">
                                    <div className="p-4 align-self-start">
                                        <i className="fas fa-check fa-2x"></i>
                                    </div>
                                    <div className="p-4 align-self-end lead">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                        Beatae tempore perspiciatis commodi praesentium autem quasi!
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="p-4 align-self-start">
                                        <i className="fas fa-check fa-2x"></i>
                                    </div>
                                    <div className="p-4 align-self-end lead">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                        Beatae tempore perspiciatis commodi praesentium autem quasi!
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="p-4 align-self-start">
                                        <i className="fas fa-check fa-2x"></i>
                                    </div>
                                    <div className="p-4 align-self-end lead">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                        Beatae tempore perspiciatis commodi praesentium autem quasi!
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card bg-primary text-center card-form">
                                    <div className="card-body">
                                        <h3>Sign Up Today</h3>
                                        <p>Pleae fill out this form to register</p>
                                        <form onSubmit={this.props.handleSubmit(this.onSignUp)}>
                                            <Field name="username" component={this.renderFormFields} placeholder="Username" />
                                            <Field name="email" component={this.renderFormFields} placeholder="Email" type="email"/>
                                            <Field name="password" component={this.renderFormFields} placeholder="Password" type="password" />
                                            <Field name="confirmPassword" component={this.renderFormFields} placeholder="Confirm Password" type="password" />
                                            <button className="btn btn-outline-light btn-block">Sign Up</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

}

const validate = (formValues,props) => {

    const error = {}
    if(!formValues.username || formValues.username.trim().length===0){
        error.username="Please enter an username"
    }
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)){
        error.email="Please enter a valid email"
    }
    if(!formValues.email || formValues.email.trim().length===0){
        error.email="Please enter an email"
    }
    if(!formValues.password){
        error.password="Please enter a password"
    }
    if(formValues.confirmPassword !== formValues.password){
        error.confirmPassword="Passwords doesn't match"
    }
    if(!formValues.confirmPassword){
        error.confirmPassword="Please enter the password again"
    }
    return error
}



const mapStateToProps = state =>{
    return {response: state.response}
}

export default connect(mapStateToProps,{ signIn })(reduxForm({
    form: 'SignUp',
    validate
})(SignUp))