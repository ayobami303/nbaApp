import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { logout } from "../actions/init";


class AppTitleHeader extends Component{

    onLogoutPress = () => {
        this.props.logout();
    }
    render(){
        const { bgColor, textColor, title, onLogoutPress} = this.props
        return(
            <View style={[styles.headerContainer, {backgroundColor: bgColor}]} >

                <Text style={[styles.title, { color: textColor}]} >{title}</Text>
                <TouchableOpacity
                    style={{ flex: 1, alignSelf: 'center' }}
                    underlayColor='transparent'
                    onPress={() => this.onLogoutPress()} >
                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <Icon style={[styles.navIcon, {color: textColor}]} name="ios-log-out-outline" size={30} />
                        <Text style={{ flex: 1, alignSelf: 'center', color: textColor }}>LOGOUT</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        // details: state.movies.details,
    }
}

export default connect(mapStateToProps, { logout })(AppTitleHeader);

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 30,
        padding: 18,
        flexDirection: 'row'
    },
    navIcon: {
        height: 37,
        // width: 30,
        // marginTop: 12,
        alignSelf: 'center',
        textAlign: 'right',
        marginRight: 15,
        flex: 1
    },
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        flex: 2,
        fontSize: 24,
        fontWeight: 'bold',        
    }
})