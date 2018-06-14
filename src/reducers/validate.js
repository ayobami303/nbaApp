const initialState = {
    data: {
        isLoading: false
    }
};

function validate(state = initialState, action) {
    if (action.type === 'VALIDATE_SUCCESS') {
        return {
            ...state,
            data: { isLoading: false, data: action.data },
        };
    } else if (action.type === "VALIDATE_LOADING") {
        return {
            ...state,
            data: { isLoading: true },
        };
    } else if (action.type === "VALIDATE_FAILED") {
        return {
            ...state,
            data: { isLoading: action.data },
        };
    } else 


    return state;
}

export default validate;
