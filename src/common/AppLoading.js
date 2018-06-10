import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export function AppLoading() {
    return(
        <View style={styles.indicatorContainer} >
            <ActivityIndicator style={styles.indicator} size="large" color="#036735" />
        </View>
    )
}

const styles = StyleSheet.create({
    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 3
    },
    indicator: {
        backgroundColor: '#E5E5E5',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5
    }
})