import Reactotron from 'reactotron-react-native'

Reactotron
  .configure({
      host: '10.100.100.187'		 
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
//   .connect() // let's connect!

if (__DEV__) Reactotron.connect();