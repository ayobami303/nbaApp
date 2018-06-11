const initialState = {
    data: { isLoading: true }
};

function info(state = initialState, action) {
    if (action.type === 'GET_SCHEDULE') {
        return {
            ...state,
            data: { data: action.data, isLoading: false },
        };
    }

    return state;
}

export default info;
