import React from 'react'
import '../../css/timeline.css'
class Timeline extends React.Component{

    renderPostedDate = date =>{
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const timestamp = new Date(date)
        const month = months[timestamp.getMonth()]
        return `${month} ${timestamp.getDate()}, ${timestamp.getFullYear()}`
    }

    render(){
        return (
            <div className="container">
                <div className="row blog-title-viewpage">
                    <h1 className="display-5">{this.props.blogTitle}</h1>
                </div>
                <div className="meta">
                    <div className="meta-author d-inline">
                        <span className="font-italic">by:&nbsp;</span>
                        <a href="#author" className="d-inline">{this.props.author}</a>
                    </div>
                    <div className="meta-date d-inline font-italic">
                        <span>{this.renderPostedDate(this.props.date)}</span>
                    </div>
                </div>
                <div className="row pt-5">
                    <img src={`data:${this.props.blogImageType};base64,${this.props.blogImage}`} alt={this.props.blogTitle} className="img-fluid timeline-image" />
                </div>
                <div className="row pt-4">
                    <p dangerouslySetInnerHTML={{__html:this.props.body}}></p>
                </div>
                
            </div>
        )
    }
}

export default Timeline