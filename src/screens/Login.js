import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Image, Platform } from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import { connect } from "react-redux";
import { Navigation } from 'react-native-navigation';
import Reactotron from "reactotron-react-native";
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';

import Registration from "./Registration";
import { login } from "../actions/login";
import { AppLoading } from "../common/AppLoading";


const navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    topBarElevationShadowEnabled: false,
    navBarButtonColor: 'white'
}


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));

        FCM.getFCMToken().then(token => {
            console.log(token)
            // store fcm token in your server
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff
        });

        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
            console.log(notif)
            Reactotron.log(notif)
        });
    }

    componentWillUnmount() {
        // stop listening for events
        this.notificationListener.remove();
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.loginn.result){
            // alert(JSON.stringify(nextProps.loginn.result));
            const { stage, user_id, email } = nextProps.loginn.result;
            if (stage == 'photo') {
                this.props.navigator.push({
                    screen: 'nbaApp.RegistrationPhoto',
                    title: '',
                    animationType: 'fade',
                    animated: true,
                    navigatorStyle,
                    passProps: {
                        title: 'Photo Upload',
                        email,
                        user_id
                    },
                    navigatorButtons: {
                        leftButtons: [
                            {}
                        ]
                    }
                })                
            }else if (stage == 'payment') {
                this.props.navigator.push({
                    screen: 'nbaApp.ProcessPayment',
                    title: '',
                    animationType: 'fade',
                    animated: true,
                    navigatorStyle,
                    passProps: {
                        email,
                        user_id
                    },
                    navigatorButtons: {
                        leftButtons: [
                            {}
                        ]
                    }
                })
            }

        }
    }

    onUsernameChange = (text) =>{       
        this.setState({ username: text })
    }

    onPasswordChange = (text) =>{
        this.setState({
            password:text
        })
    }

    onLogin = () => {
        const { username, password } = this.state;
        let errorCount = 0

        if(username.trim() === '' || password.trim() == ''){
            this.props.navigator.showInAppNotification({
                screen: 'nbaApp.ErrorNotification', 
                passProps: {
                    message:'pls fill all fields.'
                },                
            })
            // alert('pls fill all fields.');
        }else{
            this.setState({
                isLoading: true
            })
            this.props.login(username, password);

        }
        this.setState({
            isLoading: true
        })

    }

    onRegister = () => {
        this.props.navigator.push({
            screen: 'nbaApp.Registration',
            title: '',
            animationType: 'fade',
            animated: true,
            navigatorStyle:{
                drawUnderNavBar: true,
                navBarTranslucent: true,
                navBarTransparent: true,
                topBarElevationShadowEnabled: false,
                navBarButtonColor: 'white'
            }
        })
    }

    render() {
        return (
            <View style = {styles.container}>
                <Image source={require('./img/login.png')} style = {styles.bgImage}/>
                <View style={styles.formContainer}>
                    <FormInput
                        placeholder='Email address/Username'
                        keyboardType="email-address"
                        underlineColorAndroid = '#91B38D'
                        autoCapitalize='none'
                        onChangeText={(text) => { this.onUsernameChange(text) }} />
                    <FormInput
                        placeholder='Password'
                        underlineColorAndroid = '#91B38D'
                        secureTextEntry={true}
                        onChangeText={(text => { this.onPasswordChange(text) })}
                    />
                    <View style = {styles.buttonContainer}>
                        <View  style={{flex: 1}}>
                            <Button 
                                title='LOGIN' 
                                fontWeight = 'bold'
                                buttonStyle={styles.submitButton} 
                                onPress={() => { this.onLogin() }} 
                            />

                        </View>
                        <View style={{ flex: 1 }}>
                            <Button 
                                title='REGISTER' 
                                fontWeight='bold'
                                buttonStyle={styles.regButton} 
                                onPress={() => { this.onRegister() }} 
                            />

                        </View>
                    </View>

                </View>
                {this.props.loginn.isLoading &&
                    <AppLoading />
                } 
            
            </View>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return { 
        loginn: state.login.data
    };
}

export default connect(mapStateToProps, {login})(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    bgImage:{
        position: 'absolute'
    },
    formContainer: {
        justifyContent: 'center',
        backgroundColor: 'rgba(3, 103, 53, 0.3)',
        margin: 30,
        marginTop:260,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 30
    },
    logo: {
        width: 150,
        height: 70,
        alignSelf: 'center',
        marginBottom: 20
    },
    buttonContainer:{
        flexDirection:'row',
        alignItems: 'stretch',
    },
    submitButton: {                
        backgroundColor: '#036735',
        marginTop: 10,
        marginRight: -10,
        borderRadius: 10
    },
    regButton:{
        backgroundColor: '#f44336',        
        marginTop: 10,
        marginLeft: -10,
        borderRadius: 10
    },
    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 3
    },
    indicator: {
        backgroundColor: '#E5E5E5',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5
    }
})

/**
 * push-notification
 * paystack integration 
 * 
 */