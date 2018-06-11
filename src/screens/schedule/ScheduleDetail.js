import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet, Dimensions } from "react-native";
import moment from "moment-timezone";

import { Text, Heading1, Heading3, HeaderTitle, Paragraph } from "../../common/AppText";
import AppColors from "../../common/AppColors";
import formatDuration from "./formatDuration";
import { AppHeader } from "../../common/AppHeader";
import formatTime from "./formatTime";


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
        return (
            <View style = {styles.container}>
                <AppHeader />
                <ScrollView style = {styles.content}>
                    <HeaderTitle style={[styles.titleText, styles.padding]}>DAY {session.day}  |  {formatTime(session.start_time)}</HeaderTitle>
                    <Heading1 style={styles.title}>{session.title}</Heading1>
                    <Heading3 style={styles.padding}>
                        {formatDuration(moment.utc(session.start_time), moment.utc(session.end_time)).toUpperCase()}</Heading3>
                    <Paragraph style={styles.padding}>{session.description}</Paragraph>
                    <Text style={styles.padding}>Speaker: {session.speaker}</Text>
                </ScrollView>
            </View>
        )
    }
}

export default ScheduleDetail;

const styles = StyleSheet.create({
    container:{
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