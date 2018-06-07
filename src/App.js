import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux'
import Reactotron from "reactotron-react-native";

import configureStore from './store/configureStore'
import { registerScreens } from './screens';
import { appInitialized } from './actions';

const store = configureStore();

registerScreens(store, Provider);


const navigatorStyle = {
    navBarHidden: true,   
    topBarElevationShadowEnabled: false,
    navBarHideOnScroll: true,
    tabBarHidden: false,
    drawUnderTabBar: true,
    navBarTransparent: true,
    drawUnderNavBar: true,
    navBarTranslucent: false,
    statusBarHidden: false,

};


export default class App {
    constructor() {
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appInitialized());
        Reactotron.log("here")
    }

    onStoreUpdate() {
        const { root } = store.getState().app;
        if (this.currentRoot !== root) {
            this.currentRoot = root;
            this.startApp(root);
        }
    }

    startApp(root){
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
                            screen: 'nbaApp.Schedule',
                            icon: require('./asset/img/info.png'),
                            selectedIcon: require('./asset/img/info.png'),
                            title: ' Info',
                            navigatorStyle
                        },
                        {
                            label: 'Feedback',
                            screen: 'nbaApp.Schedule',
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
                        tabBarSelectedButtonColor: '#549414',
                        tabBarBackgroundColor: '#fafafa',
                        forceTitlesDisplay: true,
                    },

                })
            break;        
           
            case 'login':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'nbaApp.Login',
                        title: 'login'
                    }
                })
            break;
            
            default:
               console.log('some error occured')
            break;
        }
    }
}

