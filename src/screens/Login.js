import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import { connect } from "react-redux";
import { Navigation } from 'react-native-navigation';

import Registration from "./Registration";
import { login } from "../actions/login";
import { AppLoading } from "../common/AppLoading";


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            username: '',
            password: ''
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
            this.props.login();

        }

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
                {this.state.isLoading &&
                    <AppLoading />
                } 
            
            </View>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return { };
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