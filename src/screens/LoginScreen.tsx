import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Keyboard } from 'react-native'
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native'
import AuthButton from '../components/AuthButton'
import Background from '../components/Background'
import RightClickableText from '../components/RightClickableText'
import WhiteLogo from '../components/WhiteLogo'
import useForm from '../hooks/useForm'
import loginStyles from '../theme/loginTheme'
import AuthInput from '../components/AuthInput'

interface Props extends StackScreenProps<any, 'LoginScreen'> {}

const LoginScreen = ({navigation}: Props) => {
  const { email, password, onChange } = useForm({email: '', password: ''})

  const handleLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();
  }

  return (
    <>
      <Background />
      
      <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      >
        <View style={loginStyles.formContainer} >
          <WhiteLogo />

          <Text style={loginStyles.title} >Login</Text>

           <AuthInput 
            label="Email" field="email"
            isPassword keyboardType="email-address"
            onChange={onChange} onSubmitEditing={handleLogin}
            value={email} icon="email"
          />

          <AuthInput 
            label="Password" field="password"
            isPassword keyboardType="default"
            onChange={onChange} onSubmitEditing={handleLogin}
            value={password} icon="lock"
          />

          <AuthButton onPress={handleLogin} text="Login" iconButton="login" />
         
          <RightClickableText route="SignupScreen" navigation={navigation} text="New Account" />

        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default LoginScreen
