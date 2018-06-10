import React, { Component } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import { Button, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import RNPaystack from 'react-native-paystack';
import axios from "axios";

import { AppHeader } from "../common/AppHeader";
import { Heading1 } from "../common/AppText";
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

        const { email, isMember } = this.props;
        let amount;
        if(isMember){
            amount = 5000;
        }else{
            amount = 5000;            
        }
        alert(cvv);

        RNPaystack.chargeCard({
            cardNumber: cardNumber.toString(),
            expiryMonth: month.toString(),
            expiryYear: year.toString(),
            cvc: cvv.toString(),
            email: email,
            amountInKobo: amount,
            
        }).then(response => {
            // alert(JSON.stringify(response));
            if(response.reference != ''){
                this.setState({ reference: response.reference})
                this.verifyCharge(response.reference)
            }else{
                this.props.navigator.showInAppNotification({
                    screen: 'nbaApp.ErrorNotification',
                    passProps: {
                        message: 'Something happened. pls try again.'
                    },
                })
            }
            console.log(response); // card charged successfully, get reference here
        })
        .catch(error => {
            this.props.navigator.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'Something happened. pls try again.'
                },
            })
            alert(JSON.stringify(error))
            console.log(error); // error is a javascript Error object
            console.log(error.message);
            console.log(error.code);
        })

    }

    verifyCharge = (reference) =>{
        // this.state.reference;
        // const request = axios.get(`https://api.paystack.co/transaction/verify/${this.state.reference}`)
        //     .then(res => {
        //         const data = this.state.youtubeVideos;
        //         data.push(res.data.items[0])
        //         this.setState({ youtubeVideos: data })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        const thiss = this;
        axios({
            method: 'get',
            headers: { "authorization":"Bearer sk_test_b280b7d96975702ae1045f74dcc11ca9a7383b2a"},
            url: "https://api.paystack.co/transaction/verify/"+reference,
        })
        .then(function (response) {
            // alert(JSON.stringify(response.data.status));
            if (response.data.status) {
                thiss.props.navigator.showInAppNotification({
                    screen: 'nbaApp.SuccessNotification',
                    passProps: {
                        message: 'Payment successful.'
                    },
                })

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
            alert(error);
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
            </View>
        )
    }
}

export default ProcessPayment;

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