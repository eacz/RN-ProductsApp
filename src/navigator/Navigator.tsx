import React, { useContext } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import ProtectedScreen from '../screens/ProtectedScreen'
import SignupScreen from '../screens/SignupScreen'
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator()

const Navigator = () => {

  const { status } = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#ffffff'
        }
      }}
    >
      {
        status === 'authenticated'
        ?
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen}  />
        
        : <> 
            <Stack.Screen name="LoginScreen" component={LoginScreen}  />
            <Stack.Screen name="SignupScreen" component={SignupScreen}  />        
          </>
      }
    </Stack.Navigator>
  )
}

export default Navigator
