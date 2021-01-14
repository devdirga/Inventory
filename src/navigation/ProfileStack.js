import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../screen/Profile'
import ChangePassword from '../screen/Profile/ChangePasswordLayout'
import EditProfile from '../screen/Profile/EditProfileLayout'
import { color, font } from '../values'
const Stack = createStackNavigator()
const StackScreen = ({ navigation, route }) => {
  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  })
  return (
    <Stack.Navigator
      initialRouteName="Profile"
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
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: 'Change Password',
        }} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Edit Profile',
        }} />
    </Stack.Navigator>
  )
}

export default StackScreen
