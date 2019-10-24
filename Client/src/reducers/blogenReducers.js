import _ from 'lodash'

export const blogs = (state=[],action) =>{

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
        default:
            return state;
    }
}

export const categories = (state=[],action) =>{

    switch(action.type){
        case "FETCH_ALL_CATEGORIES":
            return {...state, ..._.mapKeys(action.payload,'id')}
        default:
            return state;
    }
}