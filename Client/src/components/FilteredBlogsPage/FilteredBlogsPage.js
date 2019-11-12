import React from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import '../../css/categoryList.css'
import '../../css/filteredBlogsPage.css'
import '../../css/homePage.css'
import CategoryList from '../HomePage/CategoryList'
import BlogList from '../HomePage/BlogList'
import { fetchFilteredBlogsByCategory, fetchAllCategories } from '../../actions'

class FilteredBlogsPage extends React.Component {

    state = { category: '' }
    componentDidMount = () => {
        this.props.fetchFilteredBlogsByCategory(this.props.match.params.category)
        this.setState({ category: this.props.match.params.category })
    }

    componentDidUpdate = () => {
        if (this.props.match.params.category !== this.state.category) {
            this.props.fetchFilteredBlogsByCategory(this.props.match.params.category)
            this.setState({ category: this.props.match.params.category })
        }
    }
    // componentWillUpdate = () => {
    //     this.props.fetchFilteredBlogsByCategory(this.props.match.params.category)
    // }

    render() {
        // const theCategory = this.state.category
        // console.log(theCategory)
        return (
            <div className="homepage-body">
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 category-list">
                            <CategoryList selectedCategory={this.state.category}/>
                        </div>
                        <div className="col-lg-6">
                            <div className="home-section">
                                <div className="home-inner text-center align-middle container clearfix">

                                    {this.state.category !== '' && Object.entries(this.props.categoryList).length ?
                                        <div className="row">
                                            <div className="text-center timeline-image">
                                                <img src={`data:jpg;base64,${this.props.categoryList[this.state.category].timelineImageByte}`} className="img-responsive" alt="" />
                                            </div>
                                            <div className="d-block dark-overlay-timeline">
                                                <div className="category-title">
                                                    <span className="display-4 ">{this.state.category}</span>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        : ''}

                                </div>
                            </div>
                            <BlogList filterCategory={this.props.match.params.category} />
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
    console.log(state)
    return {
        blogListByCategory: Object.values(state.blogList),
        categoryList: state.categoryList
    }
}

export default connect(mapStateToProps,
    { fetchFilteredBlogsByCategory, fetchAllCategories })(FilteredBlogsPage)