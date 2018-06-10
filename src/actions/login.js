import { appInitialized, changeAppRoot } from "./init";

export function login() {
    return function (dispatch) {
        // return axios.get(`${TMDB_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=casts,images,videos`)
        //     .then(res => {
        //         dispatch(retrieveMovieDetailsSuccess(res))
        //     })
        //     .catch(error => {
        //         console.log('Movie Details', error);
        //     })
        dispatch(changeAppRoot('loggedin'))
        // dispatch(loginSuccess({root:'login',user:'ayo'}));
    }
}

export function loginSuccess(res) {
    return ({
        type: 'LOGIN_SUCCESSFULL',
        login: res
    })
}
