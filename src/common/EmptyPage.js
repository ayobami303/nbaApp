import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";



class EmptyPage extends Component{

    render(){
        return(
            <View style = {styles.container}>
                <Text style ={{textAlign: 'center'}}>Sorry, no {this.props.topic} at this time.</Text>
            </View>
        )
    }
}

export default EmptyPage;


const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        backgroundColor: "#E0E0E0"
    }
})