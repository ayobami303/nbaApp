import React, { Component } from "react";
import { View, ScrollView, BackHandler, Alert, Picker, StyleSheet, Dimensions } from "react-native";
import { Button, FormInput, FormLabel, FormValidationMessage } from "react-native-elements";
import { connect } from "react-redux";


import { AppHeader } from "../common/AppHeader";
import { Heading1, HorizontalRule } from "../common/AppText";
import { AppLoading } from "../common/AppLoading";
import { regMember, getBranch, getAmount } from "../actions/registration";


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
            title: 'select',
            titleError: '',
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
            organization: '',
            organizationError: '',
            isValidEmail: false,           
            branch: 'select',
            branchError:'',
            pLocation:'select',
            pLocationError:'',
            address:'',
            addressError:'',            
            yearOfCall:'',
            yearOfCallError:'',
            password:'',
            passwordError:'',
            confPassword:'',
            confPasswordError:'',
            isConfirmed: false,
            buttonText: 'REGISTER',
            user_id: '',
            amount: '50.00'
        }

        this.props.getBranch();
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () =>{        
        Alert.alert(
            'Alert',
            'Are you sure you want to quit',
            [
                { text: 'NO', onPress: () => console.log('Cancel Pressed') },
                { text: 'YES', onPress: () => { 
                    this.props.navigator.popToRoot({
                        animated: true,
                        animationType: 'fade'
                    })
                 } },
            ],
            { cancelable: true }
        )
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    componentWillReceiveProps(nextProps) {
        // alert(JSON.stringify(nextProps));
        if(nextProps.registration.data){
            this.setState({
                buttonText: 'NEXT',
                user_id: nextProps.registration.data.user_id
            })
        }

        if (nextProps.amount.data) {
            this.setState({ amount: nextProps.amount.data.amount})
        }
    }
    
    pLocationItem = () =>{
        let itemArray = [];
        
        if(JSON.stringify(this.props.branch.data)){
            const {data} = this.props.branch
            data.forEach(item => {
                itemArray.push(<Picker.Item label={item.branch_name} value={item.branch_code} key={item.branch_code} />)
            });
        }

        return itemArray;
    }


    onTitleChange = (text) => {
        if (text.trim() === 'select') {
            this.setState({ titleError: 'pls select a title.' })
        } else {
            this.setState({ titleError: '' })
        }
        this.setState({ title: text },() => this.getAmount() ) 
    }
    getAmount = () =>{
        const { isMember, yearOfCall } = this.props;
        if(isMember){
            this.props.getAmount( this.state.title, yearOfCall);
        }
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

    onGenderChange = (text) =>{
        if (text.trim() === 'select') {
            this.setState({ genderError: 'pls select a gender.' })
        } else {
            this.setState({ genderError: '' })
        }
        this.setState({ gender: text })
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

    onOrganizationChange = (text) => {
        if (text.trim() === '') {
            this.setState({ organizationError: 'organization can not be blank.' })
        } else {            
            this.setState({ organizationError: '' })            
        }
        this.setState({ organization: text.trim() }) 
    }

    onBranchChange = (text) =>{
        if (text.trim() === 'select') {
            this.setState({ branchError: 'pls select a NBA branch.' })
        } else {
            this.setState({ branchError: '' })
        }
        this.setState({ branch: text })
    }
    
    onPlocationChange = (text) =>{
        if (text.trim() === 'select') {
            this.setState({ pLocationError: 'pls select a pick up location.' })
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


    onPasswordChange = (text) =>{
        if (text.trim() === '') {
            this.setState({ passwordError: 'password can not be blank.' })
        } else {
            if (text.trim() == this.state.confPassword) {
                this.setState({ passwordError: '', confPasswordError: '', isConfirmed: true })
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
                this.setState({ confPasswordError: '', passwordError: '', isConfirmed: true })
            }else{
                this.setState({ confPasswordError: 'password does not match.', isConfirmed: false})
            }
        }
        this.setState({ confPassword: text.trim() })
    }
    


    onNextPress = () =>{
        const { title, firstname, middlename, lastname, gender, phone, email, organization, branch, pLocation, address, password, confPassword, isValidEmail, isConfirmed, user_id, amount } = this.state;

        const { nameOnRoll, rollNo, yearOfCall, isMember } = this.props;

        let errorCount = 0;
        if(user_id.toString().trim() === ''){
            if (title === 'select') {
                this.setState({ titleError: 'pls select a title.' })
                errorCount++
            }

            if (firstname === '') {
                this.setState({ firstnameError: 'firstname can not be blank.' })        
                errorCount++
            }

            if (middlename === '') {
                this.setState({ middlenameError: 'middle name can not be blank.' })        
                errorCount++
            }

            if (lastname === '') {
                this.setState({ lastnameError: 'middle name can not be blank.' })        
                errorCount++
            }

            if (gender === 'select') {
                this.setState({ genderError: 'pls select a gender.' })        
                errorCount++
            }
        
            if (phone === '') {
                this.setState({ phoneError: 'phone number can not be blank.' })        
                errorCount++
            }

            if (email === '') {
                this.setState({ emailError: 'email address can not be blank.' })        
                errorCount++
            }

            if (organization === '') {
                this.setState({ organizationError: 'organization can not be blank.' })
                errorCount++
            }

            if (branch === 'select' && isMember) {
                this.setState({ branchError: 'pls select a NBA branch.' })        
                errorCount++
            }

            if (pLocation === 'select') {
                this.setState({ pLocationError: 'pls select a pick up location.' })        
                errorCount++
            }

            if (password === '') {
                this.setState({ passwordError: 'password can not be blank' })        
                errorCount++
            }

            if (isValidEmail && isConfirmed && errorCount <= 0) {
                this.props.regMember( title, firstname, middlename, lastname, gender, phone, organization, email, branch, pLocation, address, yearOfCall, password, rollNo, amount, isMember );
                
            } else {
                this.props.navigator.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'pls fill all fields.'
                    },
                })
                // alert("Pls fill all specified field correctly.")
            }
        }else{
            this.props.navigator.push({
                screen: 'nbaApp.RegistrationPhoto',
                title: '',
                animationType: 'fade',
                animated: true,
                navigatorStyle,
                passProps: {
                    title: 'Photo Upload',
                    email,
                    user_id,
                    amount
                }
            })
        }
    }

    render(){

        const { isMember, nameOnRoll, rollNo, yearOfCall, registration, branch, amount } = this.props
        return(
            branch.isBranchLoading ? <AppLoading /> :
            <View style = {styles.container}>
                <AppHeader />
                <ScrollView>
                <View style={styles.form}>
                    <View style={styles.formContainer}>
                        <Heading1 style={{ color: 'black', fontWeight: 'bold', paddingHorizontal: 15 }}>{this.props.title}</Heading1>
                        
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.title}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue, itemIndex) => this.onTitleChange(itemValue)}>
                                <Picker.Item label="SELECT TITLE" value="select" />
                                <Picker.Item label="SAN" value="SAN" />
                                <Picker.Item label="MR" value="MR" />
                                <Picker.Item label="MRS" value="MRS" />
                                <Picker.Item label="MISS" value="MISS" />
                            </Picker>
                        </View>
                        <FormValidationMessage>{this.state.titleError}</FormValidationMessage>
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
                                    value = {nameOnRoll}
                                    editable = {false}
                                />
                                <FormValidationMessage>{this.state.nameOnRollError}</FormValidationMessage>
                            </View>
                        }
                        <View style = {styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={styles.pickerStyle}
                                    onValueChange={(itemValue, itemIndex) => this.onGenderChange(itemValue)}>
                                <Picker.Item label="GENDER" value="select" />
                                <Picker.Item label="MALE" value="male" />
                                <Picker.Item label="FEMALE" value="female" />
                            </Picker>
                        </View>
                        <FormValidationMessage>{this.state.genderError}</FormValidationMessage>
                        {isMember && 
                            <View>
                                <FormInput
                                    placeholder='ENROLL NO'
                                    underlineColorAndroid = '#D5E3D3'
                                    keyboardType="numeric"      
                                    value = {rollNo}      
                                    editable = {false}                
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
                            <FormInput
                                placeholder='ORGANIZATION'
                                underlineColorAndroid='#D5E3D3'
                                multiline= {true}
                                value={this.state.organization}
                                onChangeText={(text) => { this.onOrganizationChange(text) }} />
                        <FormValidationMessage>{this.state.organizationError}</FormValidationMessage>
                        { isMember && 
                            <View>
                                <View style = {styles.pickerContainer}>
                                    <Picker
                                        selectedValue={this.state.branch}
                                        style={styles.pickerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.onBranchChange(itemValue)}>
                                        <Picker.Item label='SELECT NBA BRANCH' value="select" />
                                        {this.pLocationItem()}
                                    </Picker>
                                </View>                        
                                <FormValidationMessage>{this.state.branchError}</FormValidationMessage>
                            </View>
                        }
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.pLocation}
                                style={styles.pickerStyle}
                                    onValueChange={(itemValue, itemIndex) => this.onPlocationChange(itemValue)}>
                                        <Picker.Item label='SELECT PICK UP LOCATION' value="select" />
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
                                    value={yearOfCall}
                                    editable={false}
                                />
                                <FormValidationMessage>{this.state.yearOfCallError}</FormValidationMessage>
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
                        <FormInput
                            placeholder='CONFERENCE FEE'
                            underlineColorAndroid='#D5E3D3'
                            value={this.state.amount}
                            editable = {false}
                            
                        />
                        <Button
                            title= { this.state.buttonText }
                            fontWeight='bold'
                            buttonStyle={styles.submitButton}
                            onPress={() => { this.onNextPress() }}
                        />
                    </View>     
                </View>
                </ScrollView>
                { registration.isLoading &&
                    <AppLoading />
                }
                {amount.isAmountLoading &&
                    <AppLoading />
                }
            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        registration: state.registration.data,
        branch: state.branch.data,
        amount: state.amount.data
    };
}


export default connect(mapStateToProps, { regMember, getBranch, getAmount })(RegistrationForm)

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