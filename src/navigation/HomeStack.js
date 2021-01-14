import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screen/Home'
import ScanQR from '../screen/ScanQR'
import Color from '../values/color'
const Stack = createStackNavigator()
const StackScreen = ({ navigation, route }) => {
  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  })
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.primary,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="ScanQR"
        component={ScanQR}
        options={{
          title: 'Search by scan QR-Code',
        }} />
    </Stack.Navigator>
  )
}

export default StackScreen;
