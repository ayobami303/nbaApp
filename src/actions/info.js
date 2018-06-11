import axios from "axios";

export function newNotif(msg) {
    return function (dispatch) {
        dispatch({type: 'new_notif', msg:''})
    }
}

export function getNotif() {
    
    return function (dispatch) {
        axios({
            method: 'get',
            url: "http://149.56.24.222/api/info.php"
        })
        .then(function (response) {
            
            console.log("api res", response.data[0]);
            // alert(JSON.stringify(response.data));            
            dispatch({ type: 'GET_NOTIF', data: response.data });
                
            }).catch(error => {
                console.log("api error", error);
                // alert(error);
            });
            
    }
   
}