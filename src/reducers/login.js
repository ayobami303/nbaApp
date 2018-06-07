const initialState = {
    user: null,
    root: null
};

function login(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESSFULL':
            return { ...state, login: action.login }
            break;
        default:
            return state;
            break;
    }

}

export default login;
