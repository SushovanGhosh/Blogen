import React from 'react'
import { connect } from 'react-redux'

import { fetchAllBlogs } from '../../actions'

class BlogList extends React.Component{

    componentDidMount = () => {
        this.props.fetchAllBlogs()
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6  mt-5">
                        <div className="card">
                            <div className="card-horizontal">
                                <div className="img-square-wrapper">
                                    <img src="" alt=""/>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">

                                    </h4>
                                    <p className="card-text text-dark" >
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita voluptatibus ut nobis cum eos vitae deleniti esse? Eligendi aliquid deleniti consequatur sunt, reprehenderit necessitatibus officia nisi ipsum obcaecati, at corporis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.response)
    return {blogList: state.response}
}


export default  connect(mapStateToProps,{fetchAllBlogs})(BlogList)