import _ from 'lodash'

import { authenticatedRequest } from "../api/blogenService"
import history from "../history"

export const signIn = username => {
    return{
        type: 'SIGN_IN',
        payload: username
    }
}

export const signOut = () =>{
    return{
        type: 'SIGN_OUT',
    }
}

export const saveBlog = formValues => async (dispatch, getState) => {

    
    const {username} = getState().auth 
    const date = new Date();
    const currentDate = date.getFullYear()+'/'+ ('0'+(date.getMonth() + 1)).slice(-2)+'/'+ ('0' +date.getDate()).slice(-2)+ ' '+ 
    ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2) + ":" + ('0'+date.getSeconds()).slice(-2)
    // const response = await authenticatedRequest.post('/api/blogs/saveBlog',{..._.omit(formValues,'image'), username: username, createdDate: currentDate, updatedDate: currentDate},{params: formValues.image})
    const response = await authenticatedRequest.post('/api/blogs/saveBlog',{...formValues, username: username, createdDate: currentDate, updatedDate: currentDate})
    dispatch({type: 'CREATED_POST', payload: response.data})
    history.push('/');
}