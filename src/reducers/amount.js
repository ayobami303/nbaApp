const initialState = {
    data: {
        isAmountLoading: false
    }
};

function amount(state = initialState, action) {
    if (action.type === "AMOUNT_LOADING") {
        return {
            ...state,
            data: { isAmountLoading: true },
        };
    } else if (action.type === "AMOUNT_SUCCESS") {
        return {
            ...state,
            data: { isAmountLoading: false, data: action.data },
        };
    }else if (action.type === "AMOUNT_FAILED") {
        return {
            ...state,
            data: { isAmountLoading: false }
        }
    }


    return state;
}

export default amount;
