import React, { Component } from "react";
import { Text, View } from "react-native";

import AppTitleHeader from '../../common/AppTitleHeader';
import EmptyPage from "../../common/EmptyPage";


class Connect extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {{flex:1}}>
                <AppTitleHeader
                    title='Connect'                    
                    bgColor='#3949ab'
                    textColor='white'
                />
                <EmptyPage topic = "one to connect with"/>
            </View>
        )
    }
}

export default Connect;