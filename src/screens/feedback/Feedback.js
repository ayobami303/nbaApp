import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, FormInput, FormLabel, FormValidationMessage } from "react-native-elements";
import { connect } from "react-redux";

import AppTitleHeader from '../../common/AppTitleHeader';
import {AppLoading} from '../../common/AppLoading';
import { addFeedback } from "../../actions/feedback";

class Feedback extends Component {

    constructor(props) {
        super(props);       

        this.state = {
            topic:'',
            topicError:'',
            message:'',
            messageError: ''
        }
    }

    onTopicChange = (text) =>{
        if (text.trim() == '') {
            this.setState({topicError: "topic can not be blank."});
        }else{
            this.setState({topicError: ''});
        }

        this.setState({topic: text});
    }

    onMessageChange = (text) =>{
        if (text.trim() == '') {
            this.setState({ messageError: "message can not be blank." });
        } else {
            this.setState({ messageError: '' });
        }

        this.setState({ message: text });
    }

    onSubmitPress = () =>{
        const { topic, topicError, message, messageError } = this.state;
        let error = 0;

        if(topic.trim() == ''){
            this.setState({ topicError: 'topic can not be blank.'})
            error++;
        }

        if (message.trim() == '') {
            this.setState({ messageError: 'message can not be blank.' })
            error++;
        }

        if (error > 0) {
            this.props.navigator.showInAppNotification({
                screen: 'nbaApp.ErrorNotification',
                passProps: {
                    message: 'pls fill all fields.'
                },
            })
        }else{
            this.props.addFeedback(2, topic, message);            
        }
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
                            underlineColorAndroid='#91B38D'
                            onChangeText={(text => { this.onTopicChange(text) })}
                        />
                        <FormValidationMessage>{this.state.topicError}</FormValidationMessage>

                        <FormLabel>MESSAGE</FormLabel>
                        <FormInput
                            placeholder='message goes here'
                            underlineColorAndroid='#91B38D'
                            multiline = {true}
                            onChangeText={(text => { this.onMessageChange(text) })}
                        />
                        <FormValidationMessage>{this.state.messageError}</FormValidationMessage>

                        <Button
                            title = "SUBMIT"
                            fontWeight='bold'
                            buttonStyle = {styles.submitButton}
                            onPress ={() => {this.onSubmitPress()}}
                            />
                    </View>
                </View>

                {this.props.feedback.isLoading &&
                    <AppLoading />
                } 
            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
	// alert(JSON.stringify(state.feedback));
	return {
		feedback: state.feedback.data
	};
}

export default connect(mapStateToProps, {addFeedback})(Feedback);

const styles = StyleSheet.create({
    container:{
        paddingVertical: 18
    },
    formContainer:{

    },
    submitButton:{
        marginTop: 10,
        backgroundColor: '#036735'

    }
})