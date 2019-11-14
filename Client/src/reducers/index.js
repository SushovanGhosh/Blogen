import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {blogs, categories, blogListByCategories, comments} from './blogenReducers'
import authReducer from './authReducer'

export default combineReducers({
    form: formReducer,
    blogList: blogs,
    auth: authReducer,
    categoryList: categories,
    blogListByCategories: blogListByCategories,
    // commentList: comments
})