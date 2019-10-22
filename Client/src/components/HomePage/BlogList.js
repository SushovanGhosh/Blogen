import React from 'react'
import { connect } from 'react-redux'

import { fetchAllBlogs } from '../../actions'
import '../../css/blogList.css'

class BlogList extends React.Component{

    componentDidMount = () => {
        this.props.fetchAllBlogs()
        
    }

    // componentDidUpdate = () => {
    //     if(document.querySelector('.card-text') != null){
    //         document.querySelector('.card-text').innerHtml=document.querySelector('.card-text').innerText
    //     }
    // }

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
            return body.substring(0,197) + "...  "
        }
        else{
            return body
        }
    }

    stripHtml= htmlElements => {
        var tmp = document.createElement("P");
        tmp.className = "card-text text-dark" 
        tmp.innerHTML = htmlElements;
        return tmp.textContent || tmp.innerText || "";
    }

    render(){
        return this.props.blogList.map(blog =>{
            return (
                <div className="container" key={blog.id}>
                    <div className="row">
                        <div className="col-6  mt-3">
                            <div className="card w-100">
                                <div className="card">
                                    <div className="card-title px-4 pt-3 text-dark">
                                        <h4>{blog.title}</h4>
                                        <span className="text-dark username mt-n9">{blog.username}</span> 
                                    </div>   

                                    {blog.imageFile ?
                                    <div className="card-img-top text-center p-2">
                                        <img src={`data:${blog.imageType};base64,${blog.imageFile}`} className="img-thumbnail" alt=""/>
                                    </div>
                                    :""}
            
                                    <div className="card-body">
                                        <div className="card-text lead clearfix text-dark">
                                            {this.truncateTextBody(this.stripHtml(blog.body))}  
                                        <div className="btn btn-outline-primary">Read more</div> 
                                    </div>
                                        
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