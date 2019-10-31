import React from 'react'
import { connect } from 'react-redux'

import { fetchBlogByCategory } from '../../actions'
import '../../css/blogSuggestionList.css'

class BlogSuggestionList extends React.Component{

    componentDidMount = () => {
        this.props.fetchBlogByCategory(this.props.category)
    }

    // randomizeBlogList = blogList => {

    //     for(var i = 0; i < blogList.length; i++){
    //         var randomIndex = Math.floor(Math.random * (blogList.length - i))
    //         var temp = blogList[blogList.length - i -1]
    //         blogList[blogList.length - i -1] = blogList[randomIndex]
    //         blogList[randomIndex] = temp
    //     }
    //     return blogList
    // }

    renderFeaturedBlogs = (listSize) => {
        return this.props.blogs.slice(0,listSize).map(blog =>{
            return(
                <li className="list-group-item text-dark">
                    {blog.title}
                </li>
            )
        })
    }

    render(){
        return(
            <div className="featured-blogs float-right">
                {console.log(this.props.blogs)}
                <h5 className="display-4 font-italic">
                    {`FEATURED ${(this.props.category).toUpperCase()} POSTS`}
                </h5>
                <ul className="list-group text-right">
                    {this.renderFeaturedBlogs(3)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return({blogs: Object.values(state.blogListByCategories)})
}

export default connect(mapStateToProps, {fetchBlogByCategory})(BlogSuggestionList)