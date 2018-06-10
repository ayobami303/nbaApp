import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

export function AppHeader() {
    return (<View style={[styles.header, { backgroundColor: '#0b4f28' }]}>
        <Image source={require('./img/bg.png')} style={{ width: width, height: 100 }} />
</View> )   
}
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        height: 100
    },
})