
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

export const saveBlog = formdata => async (dispatch, getState) => {

    
    const {username} = getState().auth 
    const date = new Date();
    const currentDate = date.getFullYear()+'/'+ ('0'+(date.getMonth() + 1)).slice(-2)+'/'+ ('0' +date.getDate()).slice(-2)+ ' '+ 
    ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2) + ":" + ('0'+date.getSeconds()).slice(-2)
    formdata.append('createdDate',currentDate);
    formdata.append('updatedDate',currentDate)
    formdata.append('username',username)
    // const response = await authenticatedRequest.post('/api/blogs/saveBlog',{..._.omit(formValues,'image'), username: username, createdDate: currentDate, updatedDate: currentDate},{params: formValues.image})
    // const response = await authenticatedRequest.post('/api/blogs/saveBlog',{...formValues, username: username, createdDate: currentDate, updatedDate: currentDate})
    const response = await authenticatedRequest.post('/api/blogs/saveBlog',formdata)
    dispatch({type: 'CREATED_POST', payload: response.data})
    history.push('/');
}

export const fetchAllBlogs = () => async (dispatch, getstate) => {

    const response = await authenticatedRequest.get('/api/blogs/getBlogs');
    dispatch({type: 'FETCH_ALL_POSTS', payload: response.data})
}