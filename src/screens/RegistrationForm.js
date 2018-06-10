import React, { Component } from "react";
import { View, ScrollView, Text, Image, Picker, StyleSheet, Dimensions } from "react-native";
import { Button, FormInput, FormLabel, FormValidationMessage } from "react-native-elements";
import DatePicker from 'react-native-datepicker'
import PhotoUpload from 'react-native-photo-upload'


import { AppHeader } from "../common/AppHeader";
import { Heading1, HorizontalRule } from "../common/AppText";
import { AppLoading } from "../common/AppLoading";

const navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    topBarElevationShadowEnabled: false,
    navBarButtonColor: 'white'
}


class RegistrationForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            firstname:'',
            firstnameError: '',
            middlename:'',
            middlenameError:'',
            lastname:'',
            lastnameError:'',
            nameOnRoll:'',
            nameOnRollError:'',            
            gender: 'select',
            genderError:'',
            rollNo:'',
            rollNoError:'',
            phone:'',
            phoneError:'',
            email:'',
            emailError:'', 
            isValidEmail: false,           
            branch: 'select',
            branchError:'',
            pLocation:'select',
            pLocationError:'',
            address:'',
            addressError:'',            
            yearOfCall:'',
            yearOfCallError:'',
            SCN:'',
            SCNError:'',
            password:'',
            passwordError:'',
            confPassword:'',
            confPasswordError:'',
            isConfirmed: false
        }
    }

    yearOfCallItem = () =>{
        let itemArray = [];
        
        for (let i = 2018; i > 1960; i--) {
            itemArray.push(<Picker.Item label={i.toString()} value={i} key={i} />)
        }
        return itemArray;
    }

    pLocationItem = () =>{
        let itemArray = [];

        for (let i = 0; i <= 5; i++) {
            itemArray.push(<Picker.Item label={i.toString()} value={i} key={i} />)
        }
        return itemArray;
    }

    onFirstnameChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ firstnameError: 'first name can not be blank.' })
        } else {
            this.setState({ firstnameError: '' })
        }
        this.setState({ firstname: text.trim() })        
        
    }

    onMiddlenameChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ middlenameError: 'middle name can not be blank.' })
        } else {
            this.setState({ middlenameError: '' })
        }
        this.setState({ middlename: text.trim() })     
    }

    onLastnameChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ lastnameError: 'last name can not be blank.' })
        } else {
            this.setState({ lastnameError: '' })
        }
        this.setState({ lastname: text.trim() })     
    }

    onNameOnRollChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ middlenameError: 'middle name can not be blank.' })
        } else {
            this.setState({ middlenameError: '' })
        }
        this.setState({ middlename: text.trim() })  
    }

    onRollNoChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ rollNoError: 'roll no can not be blank.' })
        } else {
            this.setState({ rollNoError: '' })
        }
        this.setState({ rollNo: text.trim() }) 
    }

    onPhoneChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ phoneError: 'phone number can not be blank.' })
        } else {
            if(text.length != 11){
                this.setState({ phoneError: 'invalid phone number.' })
            }else{
                this.setState({ phoneError: '' })
            }
        }
        this.setState({ phone: text.trim() }) 
    }

    onEmailChange = (text) => {
        if (text.trim() === '') {
            this.setState({ emailError: 'email address can not be blank', isValidEmail: false })
        } else {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(text).toLowerCase())) {
                this.setState({ emailError: '', isValidEmail: true })
            } else {
                this.setState({ emailError: 'invalid email address', isValidEmail: false })
            }

        }
        this.setState({ email: text.trim() })
    }

    onPlocationChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ pLocationError: 'pick up location can not be blank.' })
        } else {
            this.setState({ pLocationError: '' })
        }
        this.setState({ pLocation: text.trim() }) 
    }

    onAddressChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ addressError: 'delivery address can not be blank.' })
        } else {
            this.setState({ addressError: '' })
        }
        this.setState({ address: text.trim() })
    }

    onSCNChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ SCNError: 'supreme court enrollment number (SCN) can not be blank.' })
        } else {
            this.setState({ SCNError: '' })
        }
        this.setState({ SCN: text.trim() })
    }

    onPasswordChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ passwordError: 'password can not be blank.' })
        } else {
            if (text.trim() == this.state.confPassword) {
                this.setState({ passwordError: '', isConfirmed: true })
            } else {
                this.setState({ passwordError: 'password does not match.', isConfirmed: false })
            }
        }
        this.setState({ password: text.trim() })
    }

    onConfPasswordChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ confPasswordError: 'confirm password.' })
        } else {
            if (text.trim() == this.state.password){
                this.setState({ confPasswordError: '', isConfirmed: true })
            }else{
                this.setState({ confPasswordError: 'password does not match.', isConfirmed: false})
            }
        }
        this.setState({ confPassword: text.trim() })
    }
    


    onNextPress = () =>{
        const { firstname, middlename, lastname, nameOnRoll, gender, rollNo, phone, email, branch, pLocation, address, yearOfCall, SCN, password, confPassword, isValidEmail, isConfirmed, isMember } = this.state;

        let errorCount = 0;

        if (firstname === '') {
            this.setState({ firstnameError: 'firstname can not be blank.' })
            alert("first")
            errorCount++
        }

        if (middlename === '') {
            this.setState({ middlenameError: 'middle name can not be blank.' })
            alert("middle")
            errorCount++
        }

        if (lastname === '') {
            this.setState({ lastnameError: 'middle name can not be blank.' })
            alert("last")
            errorCount++
        }

        if (gender === 'select') {
            this.setState({ genderError: 'pls select a gender.' })
            alert("gender")
            errorCount++
        }

        if (rollNo === '' && isMember) {
            this.setState({ rollNoError: 'roll no can not be blank.' })
            alert("roll")
            errorCount++
        }

        if (phone === '') {
            this.setState({ phoneError: 'phone number can not be blank.' })
            alert("phone")
            errorCount++
        }

        if (email === '') {
            this.setState({ emailError: 'email address can not be blank.' })
            alert("email")
            errorCount++
        }

        if (branch === 'select' && isMember) {
            this.setState({ branchError: 'pls select a NBA branch.' })
            alert("branch")
            errorCount++
        }


        if (pLocation === 'select') {
            this.setState({ pLocationError: 'pls select a pick up location.' })
            alert("location")
            errorCount++
        }

        // if (address === '') {
        //     this.setState({ addressError: 'delivery address can not be blank' })
        //     alert("addr")
        //     errorCount++
        // }

        if (SCN === '' && isMember) {
            this.setState({ SCNError: 'supreme court enrollment number (SCN) can not be blank.' })
            alert("scn")
            errorCount++
        }

        // if (address === '') {
        //     this.setState({ addressError: 'address can not be blank' })
        //     alert("first")
        //     errorCount++
        // }

        if (password === '') {
            this.setState({ passwordError: 'password can not be blank' })
            alert("pass")
            errorCount++
        }

        if (isValidEmail && isConfirmed && errorCount <= 0) {
            // this.create_offer_letter();
            this.setState({
                isLoading: true
            })

            this.props.navigator.push({
                screen: 'nbaApp.RegistrationPhoto',
                title: '',
                animationType: 'fade',
                animated: true,
                navigatorStyle,
                passProps: {
                    title: 'Photo Upload',
                    isMember: true,
                    email
                }
            })

            // alert("firstname: " + firstname + '\nsurname: ' + surname + '\nproduct type: ' + product
            //         + '\nsalary date: ' + salaryDate + '\ntenor: ' + tenor + '\nemail: ' + email + '\namount: ' + amount + '\naddress: ' + address )            

        } else {
            this.props.navigator.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'pls fill all fields.'
                },
            })
            // alert("Pls fill all specified field correctly.")
        }
        
        // this.props.navigator.push({
        //     screen: 'nbaApp.RegistrationPhoto',
        //     title: '',
        //     animationType: 'fade',
        //     animated: true,
        //     navigatorStyle,
        //     passProps: {
        //         title: 'Photo Upload',
        //         isMember: true,
        //         email                
        //     }
        // })
    }

    render(){

        const { isMember, isLoading } = this.props
        return(
            <View style = {styles.container}>
                <AppHeader />
                <ScrollView>
                <View style={styles.form}>
                    <View style={styles.formContainer}>
                        <Heading1 style={{ color: 'black', fontWeight: 'bold', paddingHorizontal: 15 }}>{this.props.title}</Heading1>
                        
                        <FormInput
                            placeholder='FIRST NAME'                                                        
                            underlineColorAndroid = '#D5E3D3'
                            value = {this.state.firstname}
                            onChangeText={(text) => { this.onFirstnameChange(text) }} />
                        <FormValidationMessage>{this.state.firstnameError}</FormValidationMessage>
                        <FormInput
                            placeholder='MIDDLE NAME'                                                        
                            underlineColorAndroid = '#D5E3D3'
                            value = {this.state.middlename}
                            onChangeText={(text) => { this.onMiddlenameChange(text) }} />
                        <FormValidationMessage>{this.state.middlenameError}</FormValidationMessage>
                        <FormInput
                            placeholder='LAST NAME'                                                        
                            underlineColorAndroid = '#D5E3D3'
                            value = {this.state.lastname}
                            onChangeText={(text) => { this.onLastnameChange(text) }} />
                        <FormValidationMessage>{this.state.lastnameError}</FormValidationMessage>
                        { isMember && 
                            <View>
                                <FormInput
                                    placeholder='NAME AS ON ROLL'                                                        
                                    underlineColorAndroid = '#D5E3D3'
                                    value = {this.props.nameOnRoll}
                                    editable = {false}
                                />
                                <FormValidationMessage>{this.state.nameOnRollError}</FormValidationMessage>
                            </View>
                        }
                        <View style = {styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                                <Picker.Item label="GENDER" value="select" />
                                <Picker.Item label="MALE" value="male" />
                                <Picker.Item label="FEMALE" value="female" />
                            </Picker>
                        </View>
                        <FormValidationMessage>{this.state.genderError}</FormValidationMessage>
                        {isMember && 
                            <View>
                                <FormInput
                                    placeholder='ROLL NO'
                                    underlineColorAndroid = '#D5E3D3'
                                    keyboardType="numeric"      
                                    value = {this.state.rollNo}                      
                                    onChangeText={(text) => { this.onRollNoChange(text) }} />
                                <FormValidationMessage>{this.state.rollNoError}</FormValidationMessage>
                            </View>
                        }
                        <FormInput
                            placeholder='PHONE NUMBER'
                            underlineColorAndroid = '#D5E3D3'
                            keyboardType="phone-pad"       
                            value = {this.state.phone}        
                            onChangeText={(text) => { this.onPhoneChange(text) }} />
                        <FormValidationMessage>{this.state.phoneError}</FormValidationMessage>
                        <FormInput
                            placeholder='EMAIL ADDRESS'
                            underlineColorAndroid = '#D5E3D3'
                            keyboardType="email-address"
                            autoCapitalize='none'
                            value = {this.state.email}
                            onChangeText={(text) => { this.onEmailChange(text) }} />
                        <FormValidationMessage>{this.state.emailError}</FormValidationMessage>
                        { isMember && 
                            <View>
                                <View style = {styles.pickerContainer}>
                                    <Picker
                                        selectedValue={this.state.branch}
                                        style={styles.pickerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({branch: itemValue})}>
                                        <Picker.Item label="NBA BRANCH" value="select" />
                                        <Picker.Item label="Ikeja" value="male" />
                                        <Picker.Item label="Onitsha" value="female" />
                                    </Picker>
                                </View>                        
                                <FormValidationMessage>{this.state.branchError}</FormValidationMessage>
                            </View>
                        }
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.pLocation}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue, itemIndex) => this.setState({ pLocation: itemValue })}>
                                    <Picker.Item label='PICK UP LOCATION' value="select" />
                                    {this.pLocationItem()}
                            </Picker>
                        </View>
                        <FormValidationMessage>{this.state.pLocationError}</FormValidationMessage>                       
                        <FormInput
                            placeholder='DELIVERY ADDRESS'
                            underlineColorAndroid = '#D5E3D3'
                            multiline = {true}
                            value = {this.state.address}                                                      
                            onChangeText={(text) => { this.onAddressChange(text) }} />
                        <FormValidationMessage>{this.state.addressError}</FormValidationMessage>
                        { isMember &&                             
                            <View>
                                <FormInput
                                    placeholder='YEAR OF CALL'
                                    underlineColorAndroid='#D5E3D3'
                                    value={this.props.yearOfCall}
                                    editable={false}
                                />
                                <FormValidationMessage>{this.state.yearOfCallError}</FormValidationMessage>
                            </View>                                
                        }
                        { isMember && 
                            <View>                        
                                <FormInput
                                    placeholder='SUPREME COURT ENROLLMENT NUMBER (SCN)'
                                    underlineColorAndroid = '#D5E3D3'
                                    keyboardType="numeric"    
                                    value = {this.state.SCN}                        
                                    onChangeText={(text) => { this.onSCNChange(text) }} />
                                <FormValidationMessage>{this.state.SCNError}</FormValidationMessage>
                            </View>
                        }    
                        <FormInput
                            placeholder='PASSWORD'
                            underlineColorAndroid = '#D5E3D3'
                            secureTextEntry={true}        
                            value = {this.state.password}                    
                            onChangeText={(text => { this.onPasswordChange(text) })}
                        />
                            <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
                        <FormInput
                            placeholder='CONFIRM PASSWORD'
                            underlineColorAndroid = '#D5E3D3'
                            secureTextEntry={true}    
                            value = {this.state.confPassword}                        
                            onChangeText={(text => { this.onConfPasswordChange(text) })}
                        />
                            <FormValidationMessage>{this.state.confPasswordError}</FormValidationMessage>
                
                        <Button
                            title='NEXT'
                            fontWeight='bold'
                            buttonStyle={styles.submitButton}
                            onPress={() => { this.onNextPress() }}
                        />
                    </View>     
                </View>
                </ScrollView>
                { isLoading &&
                    <AppLoading />
                }
            </View>
        )
    }
}

export default RegistrationForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bgImage: {
        position: 'absolute',
        top: -32,
        alignSelf: 'flex-end'
    },
    form: {
        // justifyContent: 'center',
        paddingVertical: 18,
        flex: 1,
        // borderRadius: 10,
    },
    formContainer: {
        // backgroundColor: 'rgba(3, 103, 53, 0.3)',
        // borderRadius: 10,
        // paddingTop: 10,
        paddingBottom: 30
    },
    pickerContainer:{
        paddingHorizontal: 10,
        backgroundColor:'#DFE1DF',
        marginHorizontal: 15,
        marginVertical: 10
    },
    pickerStyle:{
        height: 50, 
        width: Dimensions.get('window').width - 30,
    },
    submitButton: {
        backgroundColor: '#036735',
        marginTop: 10,
        borderRadius: 10
    },
})