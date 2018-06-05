import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import AppFonts from "../../common/AppFonts";
import AppColors from "../../common/AppColors";

class SessionHeader extends Component{


    render(){
        return(
            <View style = {styles.header}><Text style={styles.label}>{this.props.title}</Text></View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // position:'relative',
        left: 0,
        // width: 56,
        // marginBottom: -30,
        backgroundColor: '#E0E0E0',
        paddingLeft:10,
        justifyContent: "center",
        height: 40
    },
    label: {
        padding: 10,
        // textAlign: "left",
        fontFamily: AppFonts.helvetica,
        fontSize: 16,
        color: AppColors.color2
    }
});

export default SessionHeader;