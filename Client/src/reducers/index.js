import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import blogenReducers from './blogenReducers'
import authReducer from './authReducer'

export default combineReducers({
    form: formReducer,
    response: blogenReducers,
    auth: authReducer
})