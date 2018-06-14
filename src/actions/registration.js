import axios from "axios";
import {Navigation} from "react-native-navigation";

export function validate(name) {
    return function (dispatch) {
        dispatch({ type: 'VALIDATE_LOADING', data: true });
        
        axios({
            method: 'post',
            url: "http://149.56.24.222/api/registration.php",
            data: { action: "validate", name: name }
        }).then(function (response) {
            console.log("api res", response.data);
            // alert(JSON.stringify(response.data));      
            if (response.data.status == "success") {                
                dispatch({ type: 'VALIDATE_SUCCESS', data: response.data.data });
                Navigation.showInAppNotification({
                    screen: 'nbaApp.SuccessNotification',
                    passProps: {
                        message: 'member validated successfully.'
                    },
                })
            }else if(response.data.status == "failed"){
                dispatch({ type: 'VALIDATE_FAILED', data: false });                
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'member does not exist. pls check your credentials and try again.'
                    },
                })
            }else {
                dispatch({ type: 'VALIDATE_FAILED', data: false });                
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'something went wrong. pls try again.'
                    },
                })
            }      

        }).catch(error => {
            dispatch({ type: 'VALIDATE_FAILED', data: false });  
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

export function regMember(title, firstname, middle_name, lastname, gender, phone, organization, email, nba_branch, pick_up_location, deliver_address, year_of_call, password, enroll_no, amount, isMember) {
    return function (dispatch) {
        dispatch({ type: 'REGISTRATION_LOADING', data: true });
        let data;
        if (isMember) {            
            data = {
                action: "regMember",
                title: title,
                firstname: firstname,
                middle_name: middle_name,
                lastname: lastname,
                gender: gender,
                phone: phone,
                organization: organization,
                email: email,
                nba_branch: nba_branch,
                pick_up_location: pick_up_location,
                deliver_address: deliver_address,
                year_of_call: year_of_call,
                amount: amount,
                password: password,                
                enroll_no: enroll_no
            }
        } else {            
            data = {
                action: "regNonMember",
                title: title,
                firstname: firstname,
                middle_name: middle_name,
                lastname: lastname,
                gender: gender,
                phone: phone,
                organization: organization,
                email: email,
                pick_up_location: pick_up_location,
                deliver_address: deliver_address,
                amount: amount,
                password: password,
            }
        }
        
        axios({
            method: 'post',
            url: "http://149.56.24.222/api/registration.php",
            data: data
        }).then(function (response) {
            console.log("api res", response.data);
            // alert(JSON.stringify(response.data));      
            if (response.data.status == "success") {                
                dispatch({ type: 'REGISTRATION_SUCCESS', data: response.data.data });
                Navigation.showInAppNotification({
                    screen: 'nbaApp.SuccessNotification',
                    passProps: {
                        message: 'registration successfully.'
                    },
                })
            } else if (response.data.status == "account_exist"){
                dispatch({ type: 'REGISTRATION_FAILED', data: false });                
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'account already exist. pls login to continue.'
                    },
                })
            }else {
                dispatch({ type: 'REGISTRATION_FAILED', data: false });                
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'something went wrong. pls try again.'
                    },
                })
            }      

        }).catch(error => {
            dispatch({ type: 'REGISTRATION_FAILED', data: false });  
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



export function photoUpload(user_id, photo) {
    return function (dispatch) {
        dispatch({ type: 'PHOTO_LOADING', data: true });

        axios({
            method: 'post',
            url: "http://149.56.24.222/api/registration.php",
            data: { action: "photoUpload", user_id: user_id, photo: photo }
        }).then(function (response) {
            console.log("api res", response.data);
            // alert(JSON.stringify(response.data));      
            if (response.data.status == "success") {
                dispatch({ type: 'PHOTO_SUCCESS', data: response.data.data });
                Navigation.showInAppNotification({
                    screen: 'nbaApp.SuccessNotification',
                    passProps: {
                        message: 'photo successfully uploaded.'
                    },
                })
            } else {
                dispatch({ type: 'PHOTO_FAILED', data: false });
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'something went wrong. pls try again.'
                    },
                })
            }

        }).catch(error => {
            dispatch({ type: 'PHOTO_FAILED', data: false });
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

export function processPayment(user_id, txn_ref) {
    return function (dispatch) {
        axios({
            method: 'post',
            url: "http://149.56.24.222/api/registration.php",
            data: { action: "processPayment", user_id: user_id, txn_ref: txn_ref }
        }).then(function (response) {
            console.log("api res", response.data);
            // alert(JSON.stringify(response.data));      
            if (response.data.status == "success") {
                dispatch({ type: 'PAYMENT_SUCCESS', data: response.data.data });
                Navigation.showInAppNotification({
                    screen: 'nbaApp.SuccessNotification',
                    passProps: {
                        message: 'payment successful.'
                    },
                })
            } else {
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'something went wrong. pls try again.'
                    },
                })
            }

        }).catch(error => {
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

export function getBranch() {
    return function (dispatch) {
        dispatch({ type: 'BRANCH_LOADING', data: true });
        axios({
            method: 'post',
            url: "http://149.56.24.222/api/registration.php",
            data: { action: 'getBranch' }
        }).then(function (response) {
            console.log("api res", response.data);
            // alert(JSON.stringify(response.data));      
            if (response.data.status == "success") {
                dispatch({ type: 'BRANCH_SUCCESS', data: response.data.data });                
            } 

        }).catch(error => {
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

export function getAmount(title, year_of_call) {
    // alert(title,year_of_call);
    return function (dispatch) {
        dispatch({ type: 'AMOUNT_LOADING', data: true });
        axios({
            method: 'post',
            url: "http://149.56.24.222/api/registration.php",
            data: { action: 'getAmount', title: title, year_of_call: year_of_call }
        }).then(function (response) {
            console.log("api res", response.data);
            // alert(JSON.stringify(response.data));      
            if (response.data.status == "success") {
                dispatch({ type: 'AMOUNT_SUCCESS', data: response.data.data });
            }else{
                dispatch({ type: 'AMOUNT_FAILED', data: false });
                Navigation.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'something went wrong. could not load amount.'
                    },
                })
            }

        }).catch(error => {
            dispatch({ type: 'AMOUNT_FAILED', data: false });
            Navigation.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'server error. could not load amount.'
                },
            })
            console.log("api error", error);
            // alert(error);
        });

    }

}