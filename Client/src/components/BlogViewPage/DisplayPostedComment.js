import React from "react";

class DisplayPostedComment extends React.Component {
  render() {
    return (
      <div className="card mb-2">
        <div className="card-body">
            <h5 className="card-title">{this.props.username}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Just now</h6>
            <p className="text-dark lead">{this.props.comment}</p>
            <button class="card-link btn btn-link text-muted pl-0">
                <i class="fa fa-reply mr-2" aria-hidden="true"></i>
                Reply
            </button>
        </div>
      </div>
    );
  }
}

export default DisplayPostedComment;
