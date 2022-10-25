interface State{
    user: object
}

const initialState = {
    user: {}
}

export default function rootReducer(state = initialState, action: any){
    switch(action.type){
        case 'LOG_USER':
            console.log(action.payload)
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}