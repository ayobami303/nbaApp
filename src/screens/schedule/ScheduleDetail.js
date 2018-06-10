import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet, Dimensions } from "react-native";

import { Text, Heading1, Heading3, HeaderTitle, Paragraph } from "../../common/AppText";
import AppColors from "../../common/AppColors";
import formatDuration from "./formatDuration";
import { AppHeader } from "../../common/AppHeader";


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