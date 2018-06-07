import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet, Dimensions } from "react-native";

import { Text, Heading1, Heading3, HeaderTitle, Paragraph } from "../../common/AppText";
import AppColors from "../../common/AppColors";
import formatDuration from "./formatDuration";


class ScheduleDetail extends Component{
 
    static navigatorStyle ={
        navBarButtonColor: '#fff',
        drawUnderNavBar: true,
        navBarTransparent: true,
        navBarTranslucent: false,
        topBarElevationShadowEnabled: false
    } 


    render(){
        const {session} = this.props;

        const bgColor = session.location
            ? AppColors.colorForLocation(session.location.toUpperCase())
            : AppColors.blue;
        const width = Dimensions.get("window").width;
        return (
            <View style = {styles.container}>
                <View style={[styles.header, { backgroundColor: '#0b4f28'}]}>
                    <Image source={require('./img/bg.png')} style={{width:width,height:100}}/>                   
                </View>
                <ScrollView style = {styles.content}>
                    <Heading3 style = {styles.padding}>DAY 1  |  2:00pm</Heading3>
                    <Heading1 style={styles.title}>{session.title}</Heading1>
                    <HeaderTitle style={[styles.titleText, styles.padding]}>Eko Hotel - <Heading3>{formatDuration(session.startTime, session.endTime).toUpperCase()}</Heading3></HeaderTitle>
                    <Paragraph style={styles.padding}>{session.description}</Paragraph>
                    <Text style={styles.padding}>Speaker: Governor</Text>
                </ScrollView>
            </View>
        )
    }
}

export default ScheduleDetail;

const styles = StyleSheet.create({
    container:{
    },
    header:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        height:100
    },
    content:{
        padding:18
    },
    title:{
        color:'black',        
        fontWeight: 'bold',
        paddingBottom: 5
    },
    titleText:{
        color: 'black'
    },
    padding:{
        paddingBottom:10
    }
})