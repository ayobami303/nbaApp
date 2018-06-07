export function appInitialized() {
    return async function (dispatch, getState) {
        dispatch(changeAppRoot('login'));
    };
}

export function changeAppRoot(root) {
    return { type: 'ROOT_CHANGED', root: root };
}