import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class ErrorNotification extends Component{

    render(){
        return(
            <View style = {styles.container}>
                <View style={styles.iconContainer}>
                    <Icon name="md-notifications" size={30} color="rgba(255,255,255,0.8)" />
                </View>
                <Text style={styles.msgStyle}>{this.props.message}</Text>
                <Text style={styles.buttonStyle} onPress={() => this.props.navigator.dismissInAppNotification()}>Dismiss</Text>                
            </View>
        )
    }
}

export default ErrorNotification;

const styles = StyleSheet.create({
    container: {
        // width: Dimensions.get('window').width * 0.9,
        // height: Dimensions.get('window').height * 0.1,
        backgroundColor: '#f44336',
        // borderRadius: 5,
        padding: 16,
        flexDirection: 'row',
        justifyContent:'flex-start',        
    },
    iconContainer:{
        flex:1
    },
    msgStyle:{
        color: '#fff', 
        flex: 8, 
        justifyContent: 'center'
    },
    buttonStyle: { 
        color: '#fff', 
        flex: 2, 
        fontWeight: 'bold',

    }
})