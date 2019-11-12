import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { postComment } from '../../actions'
import '../../css/commentSection.css'

class CommentSection extends React.Component{

    state = {disablePost: true}

    // renderInput = ({input, placeholder}) => {
    //     return (
    //         <div className="form-group">
    //             <textarea {...input} placeholder={placeholder} className="form-control"/>
    //         </div>
    //     )
    // }

    validateInput = (event) => {
        if(event.target.value.trim().length > 0){
            this.setState({disablePost: false})
        }
        else{
            this.setState({disablePost: true}) 
        }
    }

    onCommentPost = formValues => {
     
        console.log("Posted")
        this.props.postComment(formValues,this.props.blogId)
    }

    render(){
        return (
            <div className="comment-section">
                <hr/>
                <h2 className="text-center font-weight-light">LEAVE A COMMENT</h2>
                <form onSubmit={this.props.handleSubmit(this.onCommentPost)}>
                    <div className="form-group">
                        <Field name="comment" onChange={this.validateInput} 
                        component="textarea" placeholder="write a comment" className="form-control" />
                    </div>
                    <button className="btn btn-primary d-block post-button" 
                        disabled={this.state.disablePost}>Post</button>
                    <hr/>
                </form>
            </div>
        )
    }
}


export default connect(null,{postComment})(reduxForm({
    form: 'CommentSection'
})(CommentSection))