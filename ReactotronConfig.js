import Reactotron from 'reactotron-react-native'

Reactotron
  .configure({
    // host: '192.168.1.19'		 
      host: '10.100.100.191'		 
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
//   .connect() // let's connect!

if (__DEV__) Reactotron.connect();