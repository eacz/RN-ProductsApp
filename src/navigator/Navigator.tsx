import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import ProtectedScreen from '../screens/ProtectedScreen'
import SignupScreen from '../screens/SignupScreen'

const Stack = createStackNavigator()

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#ffffff'
        }
      }}
    >
      <Stack.Screen name="ProtectedScreen" component={ProtectedScreen}  />
      <Stack.Screen name="LoginScreen" component={LoginScreen}  />
      <Stack.Screen name="SignupScreen" component={SignupScreen}  />
    </Stack.Navigator>
  )
}

export default Navigator
