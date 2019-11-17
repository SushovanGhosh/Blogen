import React from "react";
import { Field, reduxForm, formValueSelector  } from "redux-form";
import { connect } from "react-redux";

import { postComment } from "../../actions";
import "../../css/commentSection.css";
import DisplayPostedComment from "./DisplayPostedComment";

class CommentSection extends React.Component {
  state = { disablePost: true, togglePost: 0 };

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
    this.setState({togglePost: 1})

  };

  renderComments = () => {
    console.log(this.props);
    console.log(this.props.blogs[this.props.blogId]);
    const { comments } = this.props.blogs[this.props.blogId];
    return comments.slice(0).reverse().map(element => {
      const { username, comment, createdDate,id } = element
      return (
        <div className="card mb-2" key={id}>
          <div className="card-body">
            <h5 className="card-title">{username}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{createdDate}</h6>
            <p className="text-dark lead">{comment}</p>
          </div>
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
              placeholder="write a comment"
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
        <hr/>
        {console.log(this.props)}
        {this.state.togglePost === 1 ? <DisplayPostedComment comment={this.props.comment} username={this.props.username}/>:''}
        {this.renderComments()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.blogList);
  const selector = formValueSelector('CommentSection')
  // let comment = state.form.CommentSection ? state.form.CommentSection.values: ''
  return { blogs: state.blogList, comment: selector(state,'comment'), username: state.auth.username };
};

export default connect(mapStateToProps, { postComment })(
  reduxForm({
    form: "CommentSection"
  })(CommentSection)
);
