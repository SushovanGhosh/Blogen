export default (state=[],action) =>{

    switch(action.type){
        case "SIGNUP_USER":
            console.log("inside")
            return action.payload
        case "SIGNUP_FAILED":
            return action.payload
        case "CREATED_POST":
            return {...state, [action.payload.id]: action.payload}
        default:
            return state;
    }
}