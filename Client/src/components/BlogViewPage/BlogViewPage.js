import React from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import Timeline from './Timeline'
import { fetchBlog, fetchAllBlogs } from '../../actions'
import BlogSuggestionList from './BlogSuggestionList'

class BlogViewPage extends React.Component{
    
    componentDidMount = () =>{
        console.log(this.props)
        window.scrollTo(0, 0)
        this.props.fetchAllBlogs();
        this.props.fetchBlog(this.props.match.params.id)
    }

    // fetchRandomPost = () =>{
    //     let suggestedBlogList = []
    //     for(let i=0;i<3;i++){
    //         const ArrayOfKey = Object.keys(this.props.blogList)
    //         let key = ArrayOfKey[Math.floor(Math.random()*ArrayOfKey.length)]
    //         suggestedBlogList += this.props.blogList[parseInt(key)]
    //         console.log(key)
    //         console.log(Object.keys(this.props.blogList))
    //     }
    //     console.log(suggestedBlogList)
    //     return suggestedBlogList
    // }

    render(){
        if(this.props.blog){
            const {imageFile, imageType, username, title, updatedDate, body} = this.props.blog
            return (
                <div>
                    <Header />
                    <div className="container">
                        <div className="row">
                        <div className="col-sm-8">
                            <Timeline blogImage={imageFile} 
                            blogImageType={imageType} 
                            blogTitle={title} 
                            author={username} 
                            date={updatedDate} 
                            body={body} />
                        </div>
                        <div className="col-sm-4">
                            {/* {this.fetchRandomPost()} */}
                            {console.log(this.props.blog)}
                            <BlogSuggestionList category={this.props.blog.category} />
                        </div>
                        </div>
                    </div>
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = (state,ownProps) =>{
    console.log(state)
    return{blog: state.blogList[ownProps.match.params.id], blogList: state.blogList}
}

export default connect(mapStateToProps,{fetchBlog,fetchAllBlogs})(BlogViewPage)