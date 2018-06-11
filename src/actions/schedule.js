import axios from "axios";

export function getSchedule() {

    return function (dispatch) {
        axios({
            method: 'get',
            url: "http://149.56.24.222/api/schedule.php"
        })
            .then(function (response) {
                
                console.log("api res", response.data[0]);
                // alert(JSON.stringify(response.data));            
                dispatch({ type: 'GET_SCHEDULE', data: response.data });

            }).catch(error => {
                console.log("api error", error);
                // alert(error);
            });

    }

}