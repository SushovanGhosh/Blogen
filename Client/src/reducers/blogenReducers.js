import _ from 'lodash'

export default (state=[],action) =>{

    switch(action.type){
        case "SIGNUP_USER":
            console.log("inside")
            return action.payload
        case "SIGNUP_FAILED":
            return action.payload
        case "CREATED_POST":
            return {...state, [action.payload.id]: action.payload}
        case "FETCH_ALL_POSTS":
            console.log(action.payload)
            return {...state, ..._.mapKeys(action.payload,'id')}
        default:
            return state;
    }
}