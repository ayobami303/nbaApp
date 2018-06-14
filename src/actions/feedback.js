import axios from "axios";
import {Navigation} from "react-native-navigation";

export function addFeedback(userID, topic, message) {
    return function (dispatch) {
        dispatch({ type: 'FEEDBACK_LOADING', data: true });
        
        axios({
            method: 'post',
            url: "http://149.56.24.222/api/addFeedback.php",
            data: { user: userID, topic: topic, message: message }
        }).then(function (response) {
            console.log("api res", response.data);
            // alert(JSON.stringify(response.data));      
            if (response.data.status == "success") {                
                dispatch({ type: 'FEEDBACK_SUCCESS', data: false });
                Navigation.showInAppNotification({
                    screen: 'nbaApp.SuccessNotification',
                    passProps: {
                        message: 'feedback submitted successfully.'
                    },
                })
            } else {
                dispatch({ type: 'FEEDBACK_FAILED', data: false });                
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'something went wrong. pls try again.'
                    },
                })
            }      

        }).catch(error => {
            dispatch({ type: 'FEEDBACK_FAILED', data: false });  
            Navigation.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'server error.'
                },
            })              
            console.log("api error", error);
            // alert(error);
        });

    }

}