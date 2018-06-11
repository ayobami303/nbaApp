import React, { Component } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { Tile } from "react-native-elements";

import AppTitleHeader from '../../common/AppTitleHeader';


class Videos extends Component{

    constructor(props){
        super(props);       
    }

    renderVideos = () =>{
        let itemArray = [];

        for (let i = 0; i < 6; i++) {
            itemArray.push(
                <View style={{ margin: 18 }} key = {i}>
                    <Tile
                        imageSrc={require('./img/default_video.jpg')}
                        title='Opening speech'
                        icon={{ name: 'md-play', type: 'ionicon', size: 47, color: '#00b0ff' }}
                        imageContainerStyle={{ width: Dimensions.get('window').width - 36 }}
                    />
                </View>
            )
            
        }
        return itemArray;
    }
    render(){
        return(
            <View style = {{paddingBottom:150}}>
                <AppTitleHeader
                    title='Videos'                    
                    bgColor='#6a1b9a'
                    textColor='white'
                />
                <ScrollView>
                {this.renderVideos()}
                </ScrollView>
            </View>
        )
    }
}

export default Videos;