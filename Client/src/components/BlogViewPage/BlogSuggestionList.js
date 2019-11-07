import React from 'react'
import { connect } from 'react-redux'

import { fetchBlogByCategory } from '../../actions'
import '../../css/blogSuggestionList.css'
import history from '../../history'

class BlogSuggestionList extends React.Component{

    componentDidMount = () => {
        this.props.fetchBlogByCategory(this.props.blog.id)
        console.log(this.props.blog.id)
    }

    goToSelectedFeaturedPost = id => {
        this.props.fetchBlogByCategory(id)
        history.push(`/viewBlog/${id}`)
    }

    renderFeaturedBlogs = (listSize) => {
        return this.props.blogs.slice(0,listSize).map(blog =>{
            return(
                <li className="list-group-item" key={blog.id}>
                    <button onClick={()=>this.goToSelectedFeaturedPost(blog.id)} 
                        className='btn btn-link text-left text-decoration-none'> 
                        {blog.title.toUpperCase()} 
                    </button> 
                    {console.log(blog.id)}
                </li>
            )
        })
    }

    render(){
        return(
            <div className="featured-blogs float-right">
                {console.log(this.props.blogs)}
                <h5 className="display-4 font-italic">
                    {`FEATURED ${(this.props.blog.category).toUpperCase()} POSTS`}
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