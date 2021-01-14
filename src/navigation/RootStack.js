import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/Auth/LoginLayout'
import ForgotPassword from '../screen/Auth/ForgotPasswordLayout'
import Register from '../screen/Auth/RegisterLayout'
import MainTab from './MainTab'
import { color, font } from '../values'
import RegisterLayout from '../screen/Auth/RegisterLayout'
const Stack = createStackNavigator()
const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTintColor: color.textPrimary,
        headerStyle: {
          backgroundColor: color.navBar,
        },
        headerTitleStyle: {
          color: color.textPrimary,
          fontSize: font.size.navbarTitle,
        },
      }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Forgot" component={ForgotPassword}
        options={{
          headerTitle: 'Forgot Password',
        }} />
      <Stack.Screen name="Register" component={RegisterLayout}
        options={{
          headerTitle: 'Registration',
        }} />
      <Stack.Screen name="MainTab" component={MainTab}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default RootStack
