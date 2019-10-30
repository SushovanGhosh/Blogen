import React from 'react'
import { connect } from 'react-redux'

import { fetchAllCategories } from '../../actions'
import '../../css/categoryList.css'

class CategoryList extends React.Component{

    render(){
        return (
            
                <ul className="list-group list-group-flush ml-5 mt-4 sticky-top">
                    {this.props.categories.map(el =>{
                    return (
                        <button className="btn btn-link category-button" key={el.id}>
                            <li className="list-group-item bg-transparent" >
                                <div className="row">  
                                    <div className="col-lg-3">
                                        <img className="category-icons float-left" src={`data:png;base64,${el.imageByte}`} alt={el.category} />
                                    </div>
                                    <div className="col-lg-9 align-left">
                                        <span className="float-left pl-2">{el.category}</span>
                                    </div>
                                </div>
                            </li>
                        </button>
                    )})  
                }
                </ul>
            
        )
    }
}

const mapStateToProps = state => {
    return {categories: Object.values(state.categoryList)}
}

export default connect(mapStateToProps, {fetchAllCategories} )(CategoryList)