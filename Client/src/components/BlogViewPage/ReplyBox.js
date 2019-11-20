import React from 'react'

import '../../css/replyBox.css'

class ReplyBox extends React.Component {

    render() {
        return (
            <form className="form-inline reply-section">
                <div class="form-group mx-sm-3 mb-2">
                    <input type="text" class="form-control reply-box" />
                </div>
                <button type="submit" className="btn btn-success reply-btn mb-2 form-control">Reply</button>
            </form>
                )
            }
        }
        
export default ReplyBox