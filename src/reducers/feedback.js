const initialState = {
    data: { isLoading: false }
};

function feedback(state = initialState, action) {
    if (action.type === 'FEEDBACK_SUCCESS') {
        return {
            ...state,
            data: { isLoading: action.data },
        };
    } else if (action.type === "FEEDBACK_LOADING"){
        return {
            ...state,
            data: { isLoading: true },
        };
    }else if (action.type === "FEEDBACK_FAILED"){
        return {
            ...state,
            data: { isLoading: action.data },
        };
    }

    return state;
}

export default feedback;
