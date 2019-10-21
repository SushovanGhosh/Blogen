import React from 'react'
import { connect } from 'react-redux'

import { fetchAllBlogs } from '../../actions'
import '../../css/blogList.css'

class BlogList extends React.Component{

    componentDidMount = () => {
        this.props.fetchAllBlogs()
        
    }

    componentDidUpdate = () => {
        // if(document.querySelector('.card-text') != null){
        //     console.log(document.querySelector('.card-text').innerText = "Hi")
        // }
    }

    renderUpdatedTime = (date) =>{
        var updatedTime = Math.floor((Math.abs(new Date() - new Date(date))) / 1000)
        if(updatedTime < 60){
            return  `Last updated ${updatedTime} seconds ago`
        }
        else if(updatedTime >= 60 && updatedTime < 60*60){
            updatedTime = Math.floor(updatedTime / 60) 
            return `Last updated ${updatedTime} minutes ago`
        }
        else if(updatedTime >= 60*60 && updatedTime < 60*60*24){
            updatedTime = Math.floor(updatedTime / 60 / 60)
            return `Last updated ${updatedTime} hours ago`
        }
        else if(updatedTime >= 60*60*24 && updatedTime < 60*60*24*7){
            updatedTime = Math.floor(updatedTime / 60 / 60 / 24)
            return `Last updated ${updatedTime} weeks ago`
        }
        else if(updatedTime >= 60*60*24*7 && updatedTime < 60*60*24*7*12){
            updatedTime = Math.floor(updatedTime / 60 / 60 / 24 / 7)
            return `Last updated ${updatedTime} months ago`
        }
        else if(updatedTime >= 60*60*24*7*12){
            updatedTime = Math.floor(updatedTime / 60 / 60 / 24 / 7 /12)
            return `Last updated ${updatedTime} years ago`
        }
    }

    truncateTextBody = body =>{
        if(body.length > 197){
            return body.substring(0,197) + "..."
        }
        else{
            return body
        }
    }

    render(){
        return this.props.blogList.map(blog =>{
            return (
                <div className="container" key={blog.id}>
                    <div className="row">
                        <div className="col-6  mt-3">
                            <div className="card">
                                <div className="card">
                                    <div className="card-img-top text-center">
                                        {blog.imageFile ?
                                        <img src={`data:${blog.imageType};base64,${blog.imageFile}`} className="img-fluid" alt=""/>
                                        :""}
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title text-dark">
                                            {blog.title}
                                        </h4>
                                        <p className="card-text text-dark" dangerouslySetInnerHTML={{__html:this.truncateTextBody(blog.body)}}>
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{this.renderUpdatedTime(blog.updatedDate)}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        
    }
}

const mapStateToProps = state => {
    return {blogList: Object.values(state.response).reverse()}
}


export default  connect(mapStateToProps,{fetchAllBlogs})(BlogList)