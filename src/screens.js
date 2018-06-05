import { Navigation } from 'react-native-navigation';
import Schedule from './screens/schedule/Schedule';


export function registerScreens(){
    Navigation.registerComponent('nbaApp.Schedule', () => Schedule);
}