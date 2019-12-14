import React from "react";
import { Field, reduxForm, formValueSelector, getFormValues } from "redux-form";
import { connect } from "react-redux";

import { postComment } from "../../actions";
import "../../css/commentSection.css";
import DisplayPostedComment from "./DisplayPostedComment";
import ReplyBox from "./ReplyBox";

class CommentSection extends React.Component {
    state = { disablePost: true, comment: [], replyBoxId:''};

    // renderInput = ({input, placeholder}) => {
    //     return (
    //         <div className="form-group">
    //             <textarea {...input} placeholder={placeholder} className="form-control"/>
    //         </div>
    //     )
    // }
    // componentDidMount = () => {
    //     this.props.fetchCommentsbyBlog(this.props.blogId)
    // }

    validateInput = event => {
        if (event.target.value.trim().length > 0) {
            this.setState({ disablePost: false });
        } else {
            this.setState({ disablePost: true });
        }
    };

    onCommentPost = formValues => {
        console.log("Posted");
        this.props.postComment(formValues, this.props.blogId);
        this.state.comment.push(formValues.comment)
        this.setState({ comment: this.state.comment })
        formValues.comment = ''

    };

    changeReplyBoxId = (reset) =>{
        if(reset){
            this.setState({replyBoxId: ''})
        }
    }

    renderComments = () => {
        console.log(`${this.state.replyBoxId}---hello`)
        const { comments } = this.props.blogs[this.props.blogId];
        return comments.slice(0).reverse().map(element => {
            const { username, comment, createdDate, id } = element
            return (
                <div key={id} >
                    <div className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{username}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{createdDate}</h6>
                            <p className="text-dark lead">{comment}</p>
                            <button onClick={()=>this.setState({replyBoxId: id})} className="card-link btn btn-link text-muted pl-0">
                                <i className="fa fa-reply mr-2" aria-hidden="true"></i>
                                Reply
                            </button>
                        </div>
                    </div>
                    {/* { id === this.state.replyBoxId ? <ReplyBox hide={false}/>: <ReplyBox hide={true}/> }     */}
                    { id === this.state.replyBoxId ? <ReplyBox resetReplyBoxId={this.changeReplyBoxId}/>:null}
                </div>

            );
        });
    };

    // renderPostedComment = () => {
    //   return(
    //       <div className="card">
    //           {console.log('Helllllloooo')}
    //           <div className="card-body">
    //               <h5 className="card-title">abc</h5>
    //               <h6 className="card-subtitle mb-2 text-muted">Just now</h6>
    //               <p className="text-dark lead">Demo</p>
    //           </div>
    //           {this.setState({togglePost: 0})}
    //       </div>
    //   )
    // }

    render() {
        return (
            <div className="comment-section">
                <hr />
                <h2 className="text-center font-weight-light">LEAVE A COMMENT</h2>
                <form onSubmit={this.props.handleSubmit(this.onCommentPost)}>
                    <div className="form-group">
                        <Field
                            name="comment"
                            onChange={this.validateInput}
                            component="textarea"
                            placeholder="Write a comment..."
                            className="form-control"
                        />
                    </div>
                    <button
                        className="btn btn-primary d-block post-button"
                        disabled={this.state.disablePost}
                    >
                        Post
          </button>
                </form>
                <hr />
                {console.log(this.state.comment)}
                {this.state.comment.slice(0).reverse().map(el => {
                    return (
                        <DisplayPostedComment key={el} comment={el} username={this.props.username} />
                    )
                })}
                {this.renderComments()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.blogList);
    //   const selector = formValueSelector('CommentSection')
    //   const {comment} = getFormValues('CommentSection')(state) ? getFormValues('CommentSection')(state):''
    //   console.log(comment)
    // let comment = state.form.CommentSection ? state.form.CommentSection.values: ''
    return { blogs: state.blogList, username: state.auth.username };
};

export default connect(mapStateToProps, { postComment })(
    reduxForm({
        form: "CommentSection"
    })(CommentSection)
);
