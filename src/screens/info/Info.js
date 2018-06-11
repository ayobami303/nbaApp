import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card } from "react-native-elements";
import moment from "moment-timezone";
import { connect } from "react-redux";

import AppFonts from "../../common/AppFonts";
import AppColors from "../../common/AppColors";
import { Paragraph, Text} from "../../common/AppText";
import AppTitleHeader from '../../common/AppTitleHeader';
import { AppLoading} from '../../common/AppLoading';
import { getNotif } from "../../actions/info";
import EmptyPage from "../../common/EmptyPage";


class Info extends Component{

	constructor(props){
		super(props);
		this.timer;
	
		this.getNotification();
	}

	componentWillMount(props){
		this.timer = setInterval(() => this.getNotification(), 10000);
		
	}

	componentWillUnmount(props){
		clearInterval(this.timer);
	}

	getNotification(){
		this.props.getNotif();

		const { notification } = this.props;

		if(!notification.isLoading){			
			const count = notification.data.length == 0 ? null : notification.data.length;
			this.props.navigator.setTabBadge({
				tabIndex: 3,
				badge: count,
				badgeColor: '#006400',
	
			});
		}
	}

  	renderTimeAndText = () => {

		let itemArray = [];
		// const notification = { id: 1, time: '2018-06-05 12:00', text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
		const { notification } = this.props;
		
		// for(let i = 0; i < 6; i++){
			notification.data.forEach( notif => {
				itemArray.push(
					<Card key={notif.id}>
						<Text key={`${notif.id}_time`} style={styles.time}>
							{moment(notif.timestamp)
								.fromNow()
								.toUpperCase()}
						</Text>
						<Paragraph key={`${notif.id}_text`} style={styles.text}>
							{notif.message}
						</Paragraph>
					</Card>
				)
			})
			
		// }
    	return itemArray
  	}

  render(){
	  const { notification } = this.props;
	  let padd = notification.isLoading ? 0 : 150; 
      return(			  
			<View style = {{paddingBottom:padd, flex:1}}>
				<AppTitleHeader
					title='Notification'					
					bgColor='#036735'
					textColor =  'white'
				/>

			  	{notification.isLoading ? <EmptyPage topic="info" />:
					<View style = {styles.firstCell}>	
						<ScrollView>										
							{this.renderTimeAndText()}				
						</ScrollView>
					</View>
				}
			  	
		</View>
		  
      )
  }
}

function mapStateToProps(state, ownProps) {
	// alert(JSON.stringify(state.info));
	return {
		notification: state.info.data
	};
}

export default connect(mapStateToProps, { getNotif })(Info);

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