import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
const Tab = createBottomTabNavigator()

const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="home" color={color} size={size} />;
          },
        }} />
      <Tab.Screen
        name="AccountTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="user-alt" color={color} size={size} />;
          },
        }} />
    </Tab.Navigator>
  )
}

export default MainTab
