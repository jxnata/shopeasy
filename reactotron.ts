import Reactotron from 'reactotron-react-native'

console.tron = Reactotron.configure({ host: '192.168.0.3' }).useReactNative().connect()
