import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";

import AppTitleHeader from '../../common/AppTitleHeader';


class Feedback extends Component {

    constructor(props) {
        super(props);       
    }


    onSubmitPress = () =>{
        alert("thanks");
    }

    render() {
        return (
            <View>
                <AppTitleHeader
                    title='Feedback'                    
                    bgColor='#455a64'
                    textColor='white'
                />
                <View style = {styles.container}>
                    <View style = {styles.formContainer}>
                        <FormLabel>TOPIC</FormLabel>
                        <FormInput 
                            placeholder = 'topic goes here'
                        />

                        <FormLabel>MESSAGE</FormLabel>
                        <FormInput
                            placeholder='message goes here'
                            multiline = {true}
                        />

                        <Button
                            title = "SUBMIT"
                            style = {styles.submitButton}
                            onPress ={() => {this.onSubmitPress()}}
                            />
                    </View>
                </View>
            </View>
        )
    }
}

export default Feedback;

const styles = StyleSheet.create({
    container:{
        paddingVertical: 18
    },
    formContainer:{

    },
    submitButton:{
        marginTop: 10
    }
})