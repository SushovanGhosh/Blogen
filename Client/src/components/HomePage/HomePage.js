import React from 'react'
import {Field,reduxForm} from 'redux-form'
import CKEditor from 'ckeditor4-react'
import { connect } from 'react-redux'

import '../../css/homePage.css'
import Header from '../Header'
import Modal from '../Modal'
import { saveBlog,fetchAllCategories } from '../../actions'
import BlogList from './BlogList'
import CategoryList from './CategoryList'

class HomePage extends React.Component{

    // componentDidMount = (prevProps) =>{
    //     if (this.props.location !== prevProps.location){
    //         this.forceUpdate();
    //     }
    // }

    state = {uploadLabel: 'Choose File',disableSave: true}

    cleanScreen = () =>{
        window.$('loginModal').modal('hide')
        window.$('body').removeClass('modal-open');
        window.$('.modal-backdrop').remove();
    }
    componentDidMount = () =>{
        this.cleanScreen()
        this.props.fetchAllCategories()
    }

    renderFormFields = ({input,label,meta,type}) =>{
        
        const invalid = meta.error && meta.touched ? 'is-invalid':''
        return (
            <div>
                <label className="text-dark">{label}</label>
                <input {...input} className={`form-control ${invalid}`}  type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    renderError = ({error,touched}) => {
        if(error && touched){
            return(
                <div className="invalid-feedback">{error}</div>
            )
        }
    }

    onFormSave = formValues =>{
        console.log(formValues)
        let formdata = new FormData();
        for(const [key,value] of Object.entries(formValues)){
            formdata.append(key,value)
        }
        this.props.saveBlog(formdata)
    }

    renderFileUpload = () => {
        return(
            <div>
                <input type="file" accept='.jpg, .png, .jpeg' className="custom-file-input" onChange={evt =>{
                this.props.change('image', evt.target.files[0])
                this.setState({uploadLabel: evt.target.files[0].name})}} />
                <label htmlFor="image" className="custom-file-label">{this.state.uploadLabel}</label>
            </div>        
        )
    }

    renderSelectOptions = ({input,meta}) =>{
        const invalid = meta.error && meta.touched ? 'is-invalid':''
        return (
            <div>
            <select {...input} className={`form-control ${invalid}`}>
                <option value="" disabled>Choose one</option>
                {this.props.categories.map(el =>{
                    return (
                        <option value={el.category} key={el.id}>{el.category}</option>
                    )
                })}
            </select>
            {console.log(meta)}
            {this.renderError(meta)}
            </div>
        )
    }

    renderEditor = ({input}) =>{
        return (
            <CKEditor
                {...input}
                className="form-control"
                config = {{
                    basicEntities: false
                }}
                content={input.value}
                onChange={evt=>{this.props.change('body',evt.editor.getData());
                console.log(input.value)
                evt.editor.getData() === '' ? this.setState({disableSave: true}): this.setState({disableSave: false}) }}
            />
        )
    }



    renderForms = () =>{
        return (
            <form onSubmit={this.props.handleSubmit(this.onFormSave)}>
                <div className="form-group">
                    <Field name="title" className="form-control" component={this.renderFormFields} label="Title"/>
                </div>
                <div className="form-group">
                <label htmlFor="category" className="text-dark">Category</label>
                    <Field name="category" className="form-control" component={this.renderSelectOptions} />
                </div>
                <div className="form-group">
                    <label htmlFor="image" className="text-dark">Upload Image</label>
                    <div className="custom-file">
                        <Field name="image" className="form-control" component={this.renderFileUpload} id="image" label="Choose File" />
                        
                    </div>
                    <small className="form-text text-muted">Max Size 3mb</small>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="text-dark">Body</label>
                    <Field name="body" className="form-control" component={this.renderEditor} />
                </div>
                <button className="btn btn-primary" disabled={this.state.disableSave}>Save</button>
            </form>
        )
    }

    render(){
        
        return(
                <div className="homepage-body">
                    <Header />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 category-list">
                                <CategoryList />
                            </div>
                            <div className="col-lg-6">
                                <div className="home-section">
                                    <div className="home-inner text-center container clearfix">
                                        <button data-toggle="modal" data-target="#createBlogModal" className="btn btn-warning" >CREATE NEW BLOG</button>
                                     </div>
                                </div>
                                <BlogList />
                            </div>
                            <div className="col-lg-3">

                            </div>
                        </div>
                    </div>
                    
                    <Modal id="createBlogModal" size="modal-lg" title="Add Blog" headerStyle="bg-primary text-white" textboxes={()=>this.renderForms()}/>
                </div>                    
        )
    }
}

const validate = formValues =>{
    const error = {}
    
    if(!formValues.title){
        error.title = 'Please mention the title of your blog'
    }
    if(!formValues.category){
        error.category = 'Please mention the category'
    }

    return error
}
const mapStateToProps = state => {
    return {categories: Object.values(state.categoryList)}
}
export default connect(mapStateToProps,{saveBlog,fetchAllCategories})(reduxForm({
    form: 'HomePage',
    validate
})(HomePage))