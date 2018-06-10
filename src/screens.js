import { Navigation } from 'react-native-navigation';
import Schedule from './screens/schedule/Schedule';
import ScheduleDetail from './screens/schedule/ScheduleDetail';
import Connect from './screens/connect/Connect';
import Videos from './screens/videos/Videos';
import Info from './screens/info/Info';
import Feedback from './screens/feedback/Feedback';
import Login from './screens/Login';
import Registration from './screens/Registration';
import RegistrationForm from './screens/RegistrationForm';
import RegistrationPhoto from './screens/RegistrationPhoto';
import ProcessPayment from './screens/ProcessPayment';
import ErrorNotification from './common/ErrorNotification';
import SuccessNotification from './common/SuccessNotification';


export function registerScreens(store, Provider){
    Navigation.registerComponent('nbaApp.Schedule', () => Schedule, store, Provider);
    Navigation.registerComponent('nbaApp.Connect', () => Connect, store, Provider);
    Navigation.registerComponent('nbaApp.Videos', () => Videos, store, Provider);
    Navigation.registerComponent('nbaApp.Info', () => Info, store, Provider);
    Navigation.registerComponent('nbaApp.Feedback', () => Feedback, store, Provider);
    Navigation.registerComponent('nbaApp.Login', () => Login, store, Provider);
    Navigation.registerComponent('nbaApp.Registration', () => Registration, store, Provider);
    Navigation.registerComponent('nbaApp.RegistrationForm', () => RegistrationForm, store, Provider);
    Navigation.registerComponent('nbaApp.RegistrationPhoto', () => RegistrationPhoto, store, Provider);
    Navigation.registerComponent('nbaApp.ProcessPayment', () => ProcessPayment, store, Provider);
    Navigation.registerComponent('nbaApp.ScheduleDetail', () => ScheduleDetail, store, Provider);
    Navigation.registerComponent('nbaApp.ErrorNotification', () => ErrorNotification, store, Provider);
    Navigation.registerComponent('nbaApp.SuccessNotification', () => SuccessNotification, store, Provider);
}