import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import { registerScreens } from './screens';

const store = configureStore();

registerScreens(Provider, store);

Navigation.startTabBasedApp({
    tabs:[
        {
            label: 'One',
            screen: 'nbaApp.Schedule',
            icon: require('./asset/img/bills-tab.png'),
            selectedIcon: require('./asset/img/bills-tab-selected.png'),
            title: ' Screen One'
        }
    ]
})