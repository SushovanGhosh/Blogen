import React from 'react'
import '../../css/timeline.css'
import {FacebookShareButton,FacebookIcon,
    PinterestShareButton,PinterestIcon,
    TwitterShareButton, TwitterIcon,
    EmailShareButton, EmailIcon} from 'react-share'
class Timeline extends React.Component{

    renderPostedDate = date =>{
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const timestamp = new Date(date)
        const month = months[timestamp.getMonth()]
        return `${month} ${timestamp.getDate()}, ${timestamp.getFullYear()}`
    }

    
    renderSocialMediaButtons = () =>{
        console.log(window.location)
        return(
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item">
                    <FacebookShareButton className="button" 
                        url={window.location.href}>
                        <FacebookIcon className="share-button" size={32} round={true} />
                    </FacebookShareButton>
                </li>
                <li className="list-group-item">
                    <PinterestShareButton 
                        url={window.location.href}>
                        <PinterestIcon className="share-button" size={32} round={true} />
                    </PinterestShareButton>
                </li>
                <li className="list-group-item">
                    <TwitterShareButton
                        url={window.location.href}>
                        <TwitterIcon  className="share-button" size={32} round={true} />
                    </TwitterShareButton>
                </li>
                <li className="list-group-item">
                    <EmailShareButton 
                        url={window.location.href}>
                        <EmailIcon className="share-button"size={32} round={true} />
                    </EmailShareButton>
                </li>
            </ul>
        )
    }

    render(){
        return (
            <div className="container">
                <div className="row blog-title-viewpage">
                    <h1 className="display-5">{this.props.blogTitle}</h1>
                </div>
                <div className="row meta">
                    <div className="meta-author d-inline">
                        <span className="font-italic">by:&nbsp;</span>
                        <a href="#author" className="d-inline">{this.props.author}</a>
                    </div>
                    <div className="meta-date d-inline font-italic">
                        <span>{this.renderPostedDate(this.props.date)}</span>
                    </div>
                </div>
                <div className="row">
                    {this.renderSocialMediaButtons()}
                </div>
                
                <div className="row pt-4">
                    {this.props.blogImage ? 
                    <img src={`data:${this.props.blogImageType};base64,${this.props.blogImage}`} 
                    alt={this.props.blogTitle} className="img-fluid timeline-image" />:''}  
                </div>
                <div className="row pt-4 blog-body-viewpage">
                    <div className="lead" dangerouslySetInnerHTML={{__html:this.props.body}}></div>
                </div>
                
            </div>
        )
    }
}

export default Timeline