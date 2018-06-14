import { appInitialized, changeAppRoot } from "./init";
import axios from "axios";
import { Navigation } from "react-native-navigation";

export function login(email, password) {
    return function (dispatch) {
        dispatch({ type: 'LOGIN_LOADING' });
        axios({
            method: 'post',
            url: "http://149.56.24.222/api/login.php",
            data: { email: email, password: password }
        }).then(function (response) {
            console.log("api res", response.data);
            // alert(JSON.stringify(response.data));      
            if (response.data.status == "success") {
                Navigation.showInAppNotification({
                    screen: 'nbaApp.SuccessNotification',
                    passProps: {
                        message: 'login successful.'
                    },
                })
                if (response.data.data.txn_status == 0 || response.data.data.txn_ref == null) {                    
                    if(response.data.data.profile_pic == null){                                         
                        dispatch({ type: 'LOGIN_SUCCESS', result: { user_id: response.data.data.user_id, email: response.data.data.email, stage:'photo' } })
                    }else{                       
                        dispatch({ type: 'LOGIN_SUCCESS', result: { user_id: response.data.data.user_id, email: response.data.data.email, stage: 'payment' } })
                    }
                }else{                    
                    dispatch(changeAppRoot('loggedin'))
                    dispatch({ type: 'LOGIN_SUCCESS', result: null })
                }
            } else {
                dispatch({ type: 'LOGIN_FAILED' })
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'something went wrong. pls check your credentials and try again.'
                    },
                })
            }

        }).catch(error => {
            dispatch({ type: 'LOGIN_FAILED' })
            Navigation.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'server error.'
                },
            })
            console.log("api error", error);
            alert(error);
        });      

        // dispatch(loginSuccess({root:'login',user:'ayo'}));
    }
}


