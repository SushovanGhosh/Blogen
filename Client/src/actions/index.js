
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
    await authenticatedRequest().post('/api/blogs/saveBlog',formdata)
    dispatch({type: 'CREATED_POST'})
    history.push('/');
}

export const fetchAllBlogs = () => async dispatch => {

    const response = await authenticatedRequest().get('/api/blogs/getBlogs');
    dispatch({type: 'FETCH_ALL_POSTS', payload: response.data})
}

export const fetchBlog = (id) => async dispatch => {

    const response = await authenticatedRequest().get(`api/blogs/getBlog/${id}`);
    dispatch({type: 'FETCH_POST_BY_ID', payload: response.data})
}

export const fetchAllCategories = () => async dispatch => {

    const response = await authenticatedRequest().get('/api/blogs/getCategories');
    dispatch({type: 'FETCH_ALL_CATEGORIES', payload: response.data})
}

export const fetchBlogByCategory = (id) => async dispatch => {

    const response = await authenticatedRequest().get(`/api/blogs/getBlogsByCategory/${id}`);
    dispatch({type: 'FETCH_RANDOM_POSTS_BY_CATEGORY', payload: response.data})
}

export const fetchFilteredBlogsByCategory = (category) => async dispatch => {

    const response = await authenticatedRequest().get(`/api/blogs/getFilteredBlogsByCategory/${category}`);
    dispatch({type: 'FETCH_POSTS_BY_CATEGORY', payload: response.data})
}

export const postComment = (formValues,id) => async (dispatch,getState) => {

    const {username} = getState().auth 
    const date = new Date();
    const currentDate = date.getFullYear()+'/'+ ('0'+(date.getMonth() + 1)).slice(-2)+'/'+ ('0' +date.getDate()).slice(-2)+ ' '+ 
    ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2) + ":" + ('0'+date.getSeconds()).slice(-2)
    const response = await authenticatedRequest().patch(`/api/blogs/postComment/${id}`,{...formValues, username: username, createdDate: currentDate});
    dispatch({type: "ADD_COMMENT",payload: response.data})
    
}

// export const fetchCommentsbyBlog = id => async dispatch => {

//     const response = await authenticatedRequest().get(`/getCommentsByBlog/${id}`);
//     dispatch({type: "FETCH_COMMENTS_BY_BLOG", payload: response.data})
// }