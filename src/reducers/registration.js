const initialState = {
    data: { isLoading: false }
};

function registration(state = initialState, action) {
   if (action.type === "REGISTRATION_LOADING") {
        return {
            ...state,
            data: { isLoading: true },
        };
    } else if (action.type === "REGISTRATION_SUCCESS") {
        return {
            ...state,
            data: { isLoading: false, data: action.data },
        };
    } else if (action.type === "REGISTRATION_FAILED") {
        return {
            ...state,
            data: { isLoading: action.data },
        };
    } else if (action.type === "PHOTO_LOADING"){
        return {
            ...state,
            data: { isLoading: true },
        };
    } else if (action.type === "PHOTO_SUCCESS") {
        return {
            ...state,
            data: { isLoading: false, data: action.data },
        };
    } else if (action.type === "PHOTO_FAILED"){
        return {
            ...state,
            data: { isLoading: action.data },
        };
    } else if (action.type === "PAYMENT_SUCCESS") {
        return {
            ...state,
            data: { isLoading: false, data: action.data },
        };
    }

    return state;
}

export default registration;
