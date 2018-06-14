import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { Button, FormInput, FormLabel } from "react-native-elements";

import { AppHeader } from "../common/AppHeader";
import { AppLoading } from "../common/AppLoading";
import { Heading1, HorizontalRule } from "../common/AppText";
import { validate } from "../actions/registration";

const navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    topBarElevationShadowEnabled: false,
    navBarButtonColor: 'white'
}


class Registration extends Component {

    constructor(props){
        super(props);
        this.state = {
            memButton: 'VALIDATE',
            rollNo: '',
            name: '',
            yearOfCall: ''
        }
    }

    onNameChange = (text) =>{
        this.setState({
            name: text
        })
    }

    onRollChange = (text) =>{
        this.setState({
            rollNo: text
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.validatee.data){
            this.setState({ 
                rollNo: nextProps.validatee.data.EnrolNo,
                yearOfCall: nextProps.validatee.data.YearOfCall,
                memButton: 'REGISTER'
            })
            // alert(JSON.stringify(nextProps.validatee.data));
        }
        // const { isLoading } = this.props;
    }

    onMemReg = () =>{
        const { name, rollNo, yearOfCall }    = this.state;
        if(rollNo === ''){
            if(name.trim() === ''){
                this.props.navigator.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'pls fill all fields.'
                    },
                })
            }else{
                this.props.validate(name);
            }  
        }else{
            this.props.navigator.push({
                screen: 'nbaApp.RegistrationForm',
                title: '',
                animationType: 'fade',
                animated: true,
                navigatorStyle,
                passProps:{
                    title:'NBA Member',
                    nameOnRoll: this.state.name,
                    isMember: true,
                    rollNo,
                    yearOfCall                    
                },
                navigatorButtons: {
                    leftButtons: [
                        {}
                    ]
                }
            })
        }
    }

    onNonMemReg = () =>{
        this.props.navigator.push({
            screen: 'nbaApp.RegistrationForm',
            title: '',
            animationType: 'fade',
            animated: true,
            navigatorStyle,
            passProps: {
                title: 'Non NBA Member',
                isMember: false,
            }
        })
    }


    render() {
        return (
            <View style = {styles.container}>
                <AppHeader />
                <View style = {styles.form}>
                    <View style={styles.formContainer}>
                        <Heading1 style = {{color: 'black', fontWeight: 'bold', paddingHorizontal: 15 }}>Registration</Heading1>
                        <HorizontalRule style = {{backgroundColor: 'white'}}/>
                        <FormInput                            
                            underlineColorAndroid = '#D5E3D3'
                            placeholder='NAME'                                                        
                            onChangeText={(text) => { this.onNameChange(text) }} />
                        <FormInput
                            placeholder='SUPREME COURT ENROLLMENT NUMBER (SCN)'
                            keyboardType="numeric"
                            underlineColorAndroid = '#D5E3D3'
                            editable = {false}
                            value = {this.state.rollNo}
                            onChangeText={(text => { this.onRollChange(text) })}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={{ flex: 1 }}>
                                <Button
                                    title={this.state.memButton}
                                    fontWeight='bold'
                                    buttonStyle={styles.submitButton}
                                    onPress={() => { this.onMemReg() }}
                                />

                            </View>
                            <View style={{ flex: 1 }}>
                                <Button
                                    title='NON NBA MEMBER'
                                    fontWeight='bold'
                                    buttonStyle={styles.regButton}
                                    onPress={() => { this.onNonMemReg() }}
                                />

                            </View>
                        </View>

                    </View>               
                </View>

                
                {this.props.validatee.isLoading &&
                    <AppLoading />
                } 
            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        validatee: state.validate.data
    };
}

export default connect(mapStateToProps, {validate})(Registration);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    bgImage: {
        position: 'absolute',
        top: -32,
        alignSelf: 'flex-end'
    },
    inputStyle:{
        borderColor:'red' 
    },
    form:{
        // justifyContent: 'center',
        flex:1,
        paddingVertical: 18,
        // borderRadius: 5,
    },
    formContainer:{
        // backgroundColor: 'rgba(3, 103, 53, 0.3)',
        // borderRadius: 10,
        // paddingTop: 10,
        paddingBottom: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 10
    },
    submitButton: {
        backgroundColor: '#036735',
        marginTop: 10,
        marginRight: -10,
        borderRadius: 10
    },
    regButton: {
        backgroundColor: '#f44336',
        marginTop: 10,
        marginLeft: -10,
        borderRadius: 10
    },
    buttonStyle:{
        marginVertical:10
    }
    
})