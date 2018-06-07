import { Navigation } from 'react-native-navigation';
import Schedule from './screens/schedule/Schedule';
import ScheduleDetail from './screens/schedule/ScheduleDetail';
import Connect from './screens/connect/Connect';
import Videos from './screens/videos/Videos';
import Login from './screens/Login';


export function registerScreens(store, Provider){
    Navigation.registerComponent('nbaApp.Schedule', () => Schedule, store, Provider);
    Navigation.registerComponent('nbaApp.ScheduleDetail', () => ScheduleDetail, store, Provider);
    Navigation.registerComponent('nbaApp.Connect', () => Connect, store, Provider);
    Navigation.registerComponent('nbaApp.Videos', () => Videos, store, Provider);
    Navigation.registerComponent('nbaApp.Login', () => Login, store, Provider);
}