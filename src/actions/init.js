export function appInitialized() {
    return async function (dispatch, getState) {
        dispatch(changeAppRoot('login'));
    };
}

export function logout(){
    return function (dispatch) {
        dispatch(changeAppRoot('login'))
    }
}

export function changeAppRoot(root) {
    return { type: 'ROOT_CHANGED', root: root };
}