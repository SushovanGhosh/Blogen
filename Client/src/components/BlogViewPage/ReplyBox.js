import React from 'react'

import '../../css/replyBox.css'

class ReplyBox extends React.Component {

    render() {
        return (
            <div className="reply-section" style={{display:this.props.hide ? 'none':'block'}}>
                <form className="form-inline" >
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="text" className="form-control reply-box" placeholder="Write a reply..." />
                    </div>
                    <button type="submit" className="btn btn-success reply-btn mb-2 form-control">Reply</button>
                </form>
            </div>
                )
            }
        }
        
export default ReplyBox