import React from 'react'

import '../../css/replyBox.css'

class ReplyBox extends React.Component {

    state={hide:false}
    inputRef = React.createRef();


    componentDidMount = () => {
        if(!this.state.hide){
            this.inputRef.current.focus()
        }
    }

    changeReplyBoxId = () =>{
        this.props.resetReplyBoxId(true)
    }

    render() {
        return (
            
            <div className="reply-section mt-2" onBlur={()=> {this.setState({hide: true});this.changeReplyBoxId()}} style={{display:this.state.hide ? 'none':'block'}}>
                <form className="form-inline" >
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="text" ref={this.inputRef} className="form-control reply-box" placeholder="Write a reply..." />
                    </div>
                    <button type="submit" className="btn btn-success reply-btn mb-2 form-control">Reply</button>
                </form>
            </div>
                )
            }
        }
        
export default ReplyBox