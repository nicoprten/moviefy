const initialState = {
    user: {}
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'LOG_USER':
            console.log(action.payload)
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT_USER':
            console.log(action.payload)
            return{
                ...state,
                user: {}
            }
        default:
            return state;
    }
}