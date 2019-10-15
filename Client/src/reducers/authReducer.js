const INITIAL_STATUS={
    isSignedIn: null,
    username: null
}


export default (state = INITIAL_STATUS, action) =>{

    switch(action.type){
        case 'SIGN_IN':
            return {...state, isSignedIn: true, username: action.payload}
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, username: null}
        default:
            return state
    }
}