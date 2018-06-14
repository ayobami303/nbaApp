const initialState = {
    data: {
        isBranchLoading: false       
    }
};

function branch(state = initialState, action) {
    if (action.type === "BRANCH_LOADING") {
        return {
            ...state,
            data: { isBranchLoading: true },
        };
    } else if (action.type === "BRANCH_SUCCESS") {
        return {
            ...state,
            data: { isBranchLoading: false, data: action.data },
        };
    }


    return state;
}

export default branch;
