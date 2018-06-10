import React, { Component } from "react";
import { Text, View } from "react-native";

import AppTitleHeader from '../../common/AppTitleHeader';


class Feedback extends Component {

    constructor(props) {
        super(props);       
    }

    render() {
        return (
            <View>
                <AppTitleHeader
                    title='Feedback'                    
                    bgColor='#455a64'
                    textColor='white'
                />
                <Text>Hrer</Text>
            </View>
        )
    }
}

export default Feedback;