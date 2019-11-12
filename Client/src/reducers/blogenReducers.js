import _ from 'lodash'

export const blogs = (state={},action) =>{

    switch(action.type){
        case "SIGNUP_USER":
            console.log("inside")
            return action.payload
        case "SIGNUP_FAILED":
            return action.payload
        case "CREATED_POST":
            return {...state}
        case "FETCH_ALL_POSTS":
            return {...state, ..._.mapKeys(action.payload,'id')}
        case 'FETCH_POST_BY_ID':
            return {...state, [action.payload.id]: action.payload}
        case 'FETCH_POSTS_BY_CATEGORY':
            return {..._.mapKeys(action.payload,'id')}
        case 'ADD_COMMENT':
            return {...state}
        default:
            return state;
    }
}

export const categories = (state={},action) =>{

    switch(action.type){
        case "FETCH_ALL_CATEGORIES":
            return {...state, ..._.mapKeys(action.payload,'category')}
        default:
            return state;
    }
}

export const blogListByCategories = (state={},action) => {

    switch(action.type){
        case 'FETCH_RANDOM_POSTS_BY_CATEGORY':
            return {...state, ...action.payload}
        default:
            return state;
    }
}