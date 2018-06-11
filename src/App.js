import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux'
import Reactotron from "reactotron-react-native";
import { Platform } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import { persistStore } from 'redux-persist';



import configureStore from './store/configureStore'
import { registerScreens } from './screens';
import { appInitialized } from './actions';

const store = configureStore();
// const store = storeObject.store;


FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if (notif.local_notification) {
        //this is a local notification
    }
    if (notif.opened_from_tray) {
        //iOS: app is open/resumed because user clicked banner
        //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();
    console.log("notification message: ",notif.fcm.body)

    if (Platform.OS === 'ios') {
        if (notif._actionIdentifier === 'com.myapp.MyCategory.Confirm') {
            // handle notification action here
            // the text from user is in notif._userText if type of the action is NotificationActionType.TextInput
        }
        //optional
        //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
        //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
            case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
            case NotificationType.NotificationResponse:
                notif.finish();
                break;
            case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
        }
    }
});
FCM.on(FCMEvent.RefreshToken, (token) => {
    Reactotron.log(token)
    console.log(token)
    // fcm token may not be available on first load, catch it here
});


const navigatorStyle = {
    navBarHidden: true,   
    topBarElevationShadowEnabled: false,
    navBarHideOnScroll: true,
    tabBarHidden: false,
    drawUnderTabBar: false,
    navBarTransparent: true,
    drawUnderNavBar: true,
    navBarTranslucent: false,
    statusBarHidden: false,

};


export default class App {
    constructor() {
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appInitialized());
    }
    
    onStoreUpdate() {
        const { root } = store.getState().app;
        Reactotron.log(root)
        console.log(root)
        if (this.currentRoot !== root) {
            this.currentRoot = root;
            this.startApp(root);
        }
    }

    startApp(root){
        persistStore(store, null, () => {
            registerScreens(store, Provider);
            
            switch (root) {
                case 'loggedin':
                    Navigation.startTabBasedApp({
                        tabs: [
                            {
                                label: 'Schedule',
                                screen: 'nbaApp.Schedule',
                                icon: require('./asset/img/calendar.png'),
                                selectedIcon: require('./asset/img/calendar.png'),
                                title: ' Schedule',
                                navigatorStyle
                            },
                            {
                                label: 'Connect',
                                screen: 'nbaApp.Connect',
                                icon: require('./asset/img/connect.png'),
                                selectedIcon: require('./asset/img/connect.png'),
                                title: ' Connect',
                                navigatorStyle
                            },
                            {
                                label: 'Videos',
                                screen: 'nbaApp.Videos',
                                icon: require('./asset/img/videos.png'),
                                selectedIcon: require('./asset/img/videos.png'),
                                title: ' Videos',
                                navigatorStyle
                            },
                            {
                                label: 'Info',
                                screen: 'nbaApp.Info',
                                icon: require('./asset/img/info.png'),
                                selectedIcon: require('./asset/img/info.png'),
                                title: ' Info',
                                navigatorStyle
                            },
                            {
                                label: 'Feedback',
                                screen: 'nbaApp.Feedback',
                                icon: require('./asset/img/feedback.png'),
                                selectedIcon: require('./asset/img/feedback.png'),
                                title: ' Feedback',
                                navigatorStyle
                            }
                        ],
                        appStyle: {
                            navigationBarColor: 'translucent',
                            screenBackgroundColor: '#fafafa',
                            orientation: 'portrait',
                            tabBarButtonColor: '#3A3A3A',
                            tabBarSelectedButtonColor: '#036735',
                            tabBarBackgroundColor: '#fafafa',
                            forceTitlesDisplay: true,
                        },

                    })
                break;        
            
                case 'login':
                    Navigation.startSingleScreenApp({
                        screen: {
                            screen: 'nbaApp.Login',
                            title: 'login',
                            navigatorStyle
                        }
                    })
                break;
                
                default:
                    Reactotron.log('some error occured')
                break;
            }
        })
    }
}

