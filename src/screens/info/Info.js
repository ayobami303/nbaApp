import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card } from "react-native-elements";
import moment from "moment-timezone";

import AppFonts from "../../common/AppFonts";
import AppColors from "../../common/AppColors";
import { Paragraph, Text} from "../../common/AppText";
import AppTitleHeader from '../../common/AppTitleHeader';


class Info extends Component{

  renderTimeAndText = () => {
	  let itemArray = [];
	  const notification = { id: 1, time: '2018-06-05 12:00', text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
	 // const { notification } = this.props;
	 
	 for(let i = 0; i < 6; i++){
		itemArray.push(
			<Card key={i}>
				<Text key={`${notification.id}_time`} style={styles.time}>
					{moment(notification.time)
						.fromNow()
						.toUpperCase()}
				</Text>
				<Paragraph key={`${notification.id}_text`} style={styles.text}>
					{notification.text}
				</Paragraph>
			</Card>
		)
	 }
    return itemArray
  }

  render(){
      return(
			<View style = {{paddingBottom:250}}>
				<AppTitleHeader
					title='Notification'					
					bgColor='#036735'
					textColor =  'white'
				/>
            <View style = {styles.firstCell}>	
					<ScrollView>										
						{this.renderTimeAndText()}				
					</ScrollView>
				</View>
         </View>
      )
  }
}

export default Info;

const styles = StyleSheet.create({
	firstCell: {
		marginTop: 15,
		// marginBottom: 100
	},
	time: {
		fontFamily: AppFonts.primary,
		color: AppColors.colorWithAlpha("black", 0.5),
		fontSize: 13,
		marginBottom: 5
	},
	text: {
		lineHeight: 22
	},
})