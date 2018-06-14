import React, { Component } from "react";
import { View, Text, StyleSheet, Picker, BackHandler, Alert } from "react-native";
import { Button, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import RNPaystack from 'react-native-paystack';
import axios from "axios";
import { connect } from "react-redux";

import { AppHeader } from "../common/AppHeader";
import { AppLoading } from "../common/AppLoading";
import { Heading1 } from "../common/AppText";
import { processPayment } from "../actions/registration";


class ProcessPayment extends Component{

    constructor(props){
        super(props);
        this.state = {
            cardNumber:'',
            cardNumberError:'',
            month:'select',            
            year:'select',
            cvv:'',
            CVVError:'',
            reference: '',
            isPaid:false,
            isLoading: false
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton =() =>{
        Alert.alert(
            'Alert',
            'Are you sure you want to quit',
            [
                { text: 'NO', onPress: () => console.log('Cancel Pressed') },
                {
                    text: 'YES', onPress: () => {
                        this.props.navigator.popToRoot({
                            animated: true,
                            animationType: 'fade'
                        })
                        // BackHandler.exitApp()
                    }
                },
            ],
            { cancelable: true }
        )
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }


    monthItem = () =>{
        let itemArray = [];

        for (let i = 1; i <= 12; i++) {
            if (i < 10) {                
                itemArray.push(<Picker.Item label={`0${i.toString()}`} value={`0${i.toString()}`} key={i} />)
            }else{
                itemArray.push(<Picker.Item label={i.toString()} value={i} key={i} />)                
            }
        }
        return itemArray;
    }

    yearItem = () =>{
        let itemArray = [];

        for (let i = 18; i <= 25; i++) {
            itemArray.push(<Picker.Item label={i.toString()} value={i} key={i} />)
        }
        return itemArray;
    }

    cc_format(value) {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []

        for (i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }

    chargeCard = (cardNumber, month, year, cvv) => {

        const { email, isMember, amount } = this.props;
        // let amount;
        // if(isMember){
        //     amount = 5000;
        // }else{
        //     amount = 5000;            
        // }
        let newAmount = amount.split('.')
        // alert(amount+' '+ newAmount[0] +' '+ month+' '+ year+' '+ cardNumber);

        RNPaystack.chargeCard({
            cardNumber: cardNumber.toString(),
            expiryMonth: month.toString(),
            expiryYear: year.toString(),
            cvc: cvv.toString(),
            email: email,
            amountInKobo: newAmount[0] * 100,
            
        }).then(response => {
            // alert(JSON.stringify(response));
            if(response.reference != ''){
                this.setState({ reference: response.reference})
                this.verifyCharge(response.reference)
            }else{
                this.props.navigator.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'Something went wrong. pls try again.'
                    },
                })
            }
            this.setState({ isLoading: false });                
            
            console.log(response); // card charged successfully, get reference here
        }).catch(error => {
            this.props.navigator.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'Something went wrong. pls check card detail and try again.'
                },
            })
            this.setState({ isLoading: false });                
            // alert(JSON.stringify(error))
            console.log(error); // error is a javascript Error object
            console.log(error.message);
            console.log(error.code);
        })

    }

    verifyCharge = (reference) =>{        
        const thiss = this;
        axios({
            method: 'get',
            headers: { "Authorization":"Bearer sk_live_7dcc3bf8c9d0485d467676432854fb46d283e917"},
            url: "https://api.paystack.co/transaction/verify/"+reference,
        })
        .then(function (response) {
            // alert(JSON.stringify(reference));
            if (response.data.status) {
                thiss.props.processPayment(thiss.props.user_id, reference);
                
                thiss.props.navigator.popToRoot({
                    animated: true,
                    animationType: 'fade'
                }) 
            }else{
                thiss.props.navigator.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'Something happened. pls try again.'
                    },
                })
            }
            thiss.setState({isPaid: true})
        }).catch(error =>{
            // alert(error);
        });
    }

    onCardChange = (text) =>{
        if (text.trim() == '') {
            this.setState({cardNumberError: 'card number can not be empty.'})
        }else{        
            // alert(text);
            if (text.split(' ').join('').length != 16) {
                this.setState({cardNumberError: 'invalid card number.'})
            }else{
                this.setState({ cardNumberError: ''})
            }
        }

        this.setState({ cardNumber: this.cc_format(text)});
    }

    onCVVChange = (text) =>{
        if (text.trim() == '') {
            this.setState({ CVVError: 'CVV can not be empty.' })
        } else {
            if(text.length != 3){
                this.setState({ CVVError: 'invald CVV.' })
            }else{
                this.setState({ CVVError: '' })                
            }
        }

        this.setState({ cvv: text });
    }

    onSubmitPress = () =>{
        const { cardNumber, month, year, cvv } = this.state;
        let error = 0;

        if (cardNumber.trim() == '') {
            this.setState({ cardNumberError: 'card number can not be empty.' })
            error++;
        }

        if (month == 'select') {
            this.setState({ CVVError: 'pls select a month.' })
            error++;
        }
        if (year == 'select') {
            this.setState({ CVVError: 'pls select a year.' })
            error++;
        }
        if (cvv.trim() == '') {
            this.setState({ CVVError: 'CVV can not be blank.' })
            error++;
        }

        if (error <= 0) {  
            this.setState({ isLoading: true });                
            this.chargeCard(cardNumber.split(' ').join(''), month, year, cvv);
        }else{
            this.props.navigator.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'pls fill all fields.'
                },
            })
        }
        // alert(cardNumber.split(' ').join(''));
    }

    render(){
        return(
            <View style = {styles.container}>
                <AppHeader />
                <View>
                    <Heading1 style={{ color: 'black', fontWeight: 'bold', paddingHorizontal: 15 }}>Payment</Heading1>
                    <FormLabel>CARD NUMBER</FormLabel>
                    <FormInput 
                        placeholder='CARD NUMBER'
                        keyboardType = 'numeric'
                        underlineColorAndroid='#D5E3D3'
                        value={this.state.cardNumber}                    
                        onChangeText={(text) => { this.onCardChange(text) }}
                    />                
                    <FormValidationMessage>{this.state.cardNumberError}</FormValidationMessage>

                    <FormLabel>EXPIRY</FormLabel>
                    <View style = {styles.expiry}>
                        <View style = {styles.month}>                
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={this.state.month}
                                    style={styles.pickerStyle}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ month: itemValue })}>
                                    <Picker.Item label='MONTH' value="select" />
                                    {this.monthItem()}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.month}>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={this.state.year}
                                    style={styles.pickerStyle}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ year: itemValue })}>
                                    <Picker.Item label='YEAR' value="select" />
                                    {this.yearItem()}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.month}>
                            <FormInput
                                placeholder='CVV'
                                maxLength = {3}
                                keyboardType='numeric'
                                underlineColorAndroid='#D5E3D3'
                                value={this.state.cvv}
                                style = {{flex:1}}
                                onChangeText={(text) => { this.onCVVChange(text) }}
                            />
                        </View>
                    </View>
                    <FormValidationMessage>{this.state.CVVError}</FormValidationMessage>
                    <Button
                        title='SUBMIT'
                        fontWeight='bold'
                        buttonStyle={styles.submitButton}
                        onPress={() => { this.onSubmitPress() }}
                    />
                </View>
                {this.state.isLoading &&
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


export default connect(mapStateToProps,{ processPayment })(ProcessPayment);

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    expiry:{
        flexDirection: 'row'
    },
    month:{
        flex:1
    },
    year:{
        flex:1
    },
    pickerContainer: {
        paddingHorizontal: 10,
        backgroundColor: '#DFE1DF',
        marginHorizontal: 5,
        marginVertical: 10
    },
    pickerStyle: {
        height: 50,
        // width: Dimensions.get('window').width - 30,
    },
    submitButton: {
        backgroundColor: '#036735',
        marginTop: 10,
        borderRadius: 10
    },
})