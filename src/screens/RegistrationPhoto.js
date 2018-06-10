import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import PhotoUpload from 'react-native-photo-upload'
import { Button, FormInput, FormLabel } from "react-native-elements";


import { AppHeader } from "../common/AppHeader";
import { Heading1, HorizontalRule } from "../common/AppText";


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
            photo:''
        }
    }

    onRegisterPress = () =>{
        const { photo } = this.state;
        const { isMember, email } = this.props;
        this.props.navigator.push({
            screen: 'nbaApp.ProcessPayment',
            title: '',
            animationType: 'fade',
            animated: true,
            navigatorStyle,
            passProps: {
                title: 'Payment',
                isMember,
                email

            }
        })
        // if(photo){
        //     this.props.navigator.push({
        //         screen: 'nbaApp.ProcessPayment',
        //         title: '',
        //         animationType: 'fade',
        //         animated: true,
        //         navigatorStyle,
        //         passProps: {
        //             title: 'Photo Upload',
        //             isMember: true
        //         }
        //     })
        // }else{
        //     this.props.navigator.showInAppNotification({
        //         screen: 'nbaApp.ErrorNotification',
        //         passProps: {
        //             message: 'pls take a photo.'
        //         },
        //     })
        // }
        
    }

    render(){
        return(
            <View style = {{flex:1}}>
                <AppHeader />
                <View style={{paddingVertical:18, flex:1}}>
                    <Heading1 style={{ color: 'black', fontWeight: 'bold', paddingHorizontal: 15 }}>{this.props.title}</Heading1>

                    <PhotoUpload
                        containerStyle={{ paddingHorizontal: 15 }}
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
            </View>
        )
    }
}

export default RegistrationPhoto;

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#036735',
        marginTop: 10,
        borderRadius: 10
    },
})