import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import PhotoUpload from 'react-native-photo-upload'
import { Button, FormInput, FormLabel } from "react-native-elements";
import { connect } from "react-redux";


import { AppHeader } from "../common/AppHeader";
import { AppLoading } from "../common/AppLoading";
import { Heading1, HorizontalRule } from "../common/AppText";
import { photoUpload } from "../actions/registration";

const navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    topBarElevationShadowEnabled: false,
    navBarButtonColor: 'white'
}


class RegistrationPhoto extends Component{

    constructor(props){
        super(props);
        this.state = {
            photo:'',
            isLoading: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.registration.data){
            const user_id = nextProps.registration.data.user_id;
            this.props.navigator.push({
                screen: 'nbaApp.ProcessPayment',
                title: '',
                animationType: 'fade',
                animated: true,
                navigatorStyle,
                passProps: {
                    email: this.props.email,
                    user_id,
                    amount: this.props.amount
                },
                navigatorButtons: {
                    leftButtons: [
                        {}
                    ]
                }
            })
        }
    }

    onRegisterPress = () =>{
        const { photo } = this.state;
        const { isMember, email, user_id } = this.props;
        
        if(photo){
            this.props.photoUpload(user_id, photo)            
        }else{
            this.props.navigator.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'pls take a photo.'
                },
            })
        }
        
    }

    render(){
        // alert(this.props.user_id)
        return(
            <View style = {{flex:1}}>
                <AppHeader />
                <View style={{paddingVertical:18, flex:1}}>
                    <Heading1 style={{ color: 'black', fontWeight: 'bold', paddingHorizontal: 15 }}>{this.props.title}</Heading1>

                    <PhotoUpload
                        containerStyle={{ paddingHorizontal: 15 }}
                        format = "PNG"
                        onStart={() => this.setState({ isLoading: true })}
                        onResponse = {() => this.setState({isLoading: false})}
                        onPhotoSelect={avatar => {
                            if (avatar) {
                                console.log('Image base64 string: ', avatar)
                                this.setState({photo: avatar})
                            }
                        }}
                    >
                        <Image
                            style={{
                                paddingVertical: 30,
                                width: 200,
                                height: 200,
                            }}
                            resizeMode='cover'
                            source={require('./img/default_avatar.jpg')}
                        />
                    </PhotoUpload>

                    <Button 
                        title = 'PROCEED TO PAYMENT' 
                        fontWeight='bold'
                        buttonStyle = {styles.submitButton} 
                        onPress = {() => this.onRegisterPress()}
                    />

                </View>

                {this.props.registration.isLoading &&
                    <AppLoading />
                }
                { this.state.isLoading &&
                    <AppLoading />
                }
            </View>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        registration: state.registration.data
    };
}

export default connect(mapStateToProps, {photoUpload})(RegistrationPhoto);

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#036735',
        marginTop: 10,
        borderRadius: 10
    },
})