import React from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import '../../css/categoryList.css'
import CategoryList from '../HomePage/CategoryList'
import BlogList from '../HomePage/BlogList'
import { fetchFilteredBlogsByCategory, fetchAllCategories } from '../../actions'

class FilteredBlogsPage extends React.Component{

    state = {category:''}
    componentDidMount = () => {
        this.props.fetchFilteredBlogsByCategory(this.props.match.params.category)
        this.setState({category: this.props.match.params.category})
    }

    componentDidUpdate = () => {
        if (this.props.match.params.category !== this.state.category){
            this.props.fetchFilteredBlogsByCategory(this.props.match.params.category)
            this.setState({category: this.props.match.params.category})
        }
    }
    // componentWillUpdate = () => {
    //     this.props.fetchFilteredBlogsByCategory(this.props.match.params.category)
    // }

    render(){
        console.log(this.props)
        return(
            <div className="homepage-body">
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 category-list">
                            <CategoryList selectedCategory={this.props.match.params.category}/>
                        </div>
                        <div className="col-lg-6">
                            <div className="home-section">
                                <div className="home-inner text-center container clearfix">
                                    {/* <button data-toggle="modal" 
                                        data-target="#createBlogModal" 
                                        className="btn btn-warning" >
                                            CREATE NEW BLOG
                                    </button> */} 
                                   
                                    <div className="row">
                                        <div className="card w-100">
                                            <div className="card">
                                                <div className="card-body text-left">
                                                   <h3>{this.state.category}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>     
                                 </div>
                            </div>
                            <BlogList filterCategory={this.props.match.params.category}/>
                        </div>
                        <div className="col-lg-3">

                        </div>
                    </div>
                </div>
                
            </div>                    
        )
    }
}

const mapStateToProps = state => {
    return {blogListByCategory: Object.values(state.blogList)}
}

export default connect(mapStateToProps,
    {fetchFilteredBlogsByCategory})(FilteredBlogsPage)