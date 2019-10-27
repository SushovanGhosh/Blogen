import React from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import Timeline from './Timeline'
import { fetchBlog, fetchAllBlogs } from '../../actions'

class BlogViewPage extends React.Component{
    
    componentDidMount = () =>{
        console.log(this.props)
        this.props.fetchAllBlogs();
        this.props.fetchBlog(this.props.match.params.id)
    }

    render(){
        console.log(this.props.blog)
        if(this.props.blog){
            const {imageFile, imageType, username, title, updatedDate, body} = this.props.blog
            return (
                <div>
                    <Header />
                    {console.log(this.props)}
                    <Timeline blogImage={imageFile} blogImageType={imageType} blogTitle={title} author={username} date={updatedDate} body={body} />                
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = (state,ownProps) =>{
    console.log(state)
    return{blog: state.blogList[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchBlog,fetchAllBlogs})(BlogViewPage)