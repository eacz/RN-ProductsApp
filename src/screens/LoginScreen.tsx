import React from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Background from '../components/Background'
import WhiteLogo from '../components/WhiteLogo'
import loginStyles from '../theme/loginTheme'

const LoginScreen = () => {
  return (
    <>
      <Background />

      <View style={loginStyles.formContainer} >
        <WhiteLogo />

        <Text style={loginStyles.title} >Login</Text>
        <Text style={loginStyles.label} >Email</Text>
        <TextInput 
          placeholder="Write your email"
          underlineColorAndroid="#ffffff" 
          placeholderTextColor="rgba(255,255,255,0.4)" 
          keyboardType="email-address" 
          style={[loginStyles.inputField, (Platform.OS ==="ios") && loginStyles.inputFieldIos]}
          selectionColor="#ffffff"
          autoCorrect={false}
          autoCapitalize="none"
          //onChange
          //value
          />
        <Text style={loginStyles.label} >Password</Text>
        <TextInput 
          placeholder="******"
          underlineColorAndroid="#ffffff" 
          placeholderTextColor="rgba(255,255,255,0.4)"  
          style={[loginStyles.inputField, (Platform.OS ==="ios") && loginStyles.inputFieldIos]}
          selectionColor="#ffffff"
          autoCorrect={false}
          autoCapitalize="none"
          //onChange
          //value
          />

        <View style={loginStyles.buttonContainer} >
          <TouchableOpacity style={loginStyles.button} activeOpacity={0.8} >
            <Text style={loginStyles.buttonText} >Login</Text>
          </TouchableOpacity>
        </View>

        <View style={loginStyles.newUserContainer} >  
          <TouchableOpacity >
              <Text style={loginStyles.buttonText} > New Account </Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  )
}

export default LoginScreen
