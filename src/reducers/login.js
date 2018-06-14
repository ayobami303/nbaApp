const initialState = {
    data:{
        isLoading: false,
        result: null 
    }
};

function login(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, data: { isLoading: false, result: action.result } }
            break;
        case 'LOGIN_FAILED':
            return { ...state, data: { isLoading: false } }
            break;
        case 'LOGIN_LOADING':
            return {...state, data: { isLoading: true } }
            break;
        default:
            return state;
            break;
    }

}

export default login;
