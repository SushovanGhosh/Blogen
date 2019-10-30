import React from 'react'
import { connect } from 'react-redux'

import { fetchBlogByCategory } from '../../actions'

class BlogSuggestionList extends React.Component{

    componentDidMount = () => {
        this.props.fetchBlogByCategory(this.props.category)
    }

    render(){
        return(
            <div>{console.log(this.props.blogs)}</div>
        )
    }
}

const mapStateToProps = state => {

    return({blogs: state.blogListByCategories})
}

export default connect(mapStateToProps, {fetchBlogByCategory})(BlogSuggestionList)