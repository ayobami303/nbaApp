const initialState = {
    root: null
};

function app(state = initialState, action) {
    if (action.type === 'ROOT_CHANGED') {
        return {
            ...state,
            root: action.root
        };
    }

    return state;
}

export default app;
