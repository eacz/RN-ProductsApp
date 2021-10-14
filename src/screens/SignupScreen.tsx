import React, { useEffect, useContext } from 'react'
import { KeyboardAvoidingView, Platform, View, Text, Keyboard, Alert } from 'react-native'
import AuthButton from '../components/AuthButton'
import RightClickableText from '../components/RightClickableText'
import WhiteLogo from '../components/WhiteLogo'
import loginStyles from '../theme/loginTheme'
import { StackScreenProps } from '@react-navigation/stack';
import useForm from '../hooks/useForm'
import AuthInput from '../components/AuthInput'
import { AuthContext } from '../context/AuthContext';


interface Props extends StackScreenProps<any, 'SignupScreen'> {}

const SignupScreen = ({ navigation } : Props) => {
  const { signUp, errorMessage, removeError } = useContext(AuthContext)
  const { email, password, name, onChange } = useForm({name: '', email: '', password: ''})

  const handleSignup = () => {
    signUp({correo: email, nombre: name, password})
    Keyboard.dismiss()
  }

  useEffect(() => {
    if(errorMessage.length === 0) return 
    Alert.alert('Register failed', errorMessage, [ { text: 'Ok', onPress: removeError } ])
  }, [errorMessage])


  return (
    <>
      <KeyboardAvoidingView 
        style={{flex: 1, backgroundColor: '#5856d6'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      >
        <View style={loginStyles.formContainer} >
          <WhiteLogo />
          <Text style={loginStyles.title} >Create an account</Text>

          <AuthInput
            label="Name" field="name"
            keyboardType="default"
            onChange={onChange} onSubmitEditing={handleSignup}
            value={name} icon="person"
          />
          <AuthInput
            label="Email" field="email"
            keyboardType="email-address"
            onChange={onChange} onSubmitEditing={handleSignup}
            value={email} icon="email"
          />
          <AuthInput
            label="Password" field="password"
            keyboardType="default" isPassword
            onChange={onChange} onSubmitEditing={handleSignup}
            value={password} icon="lock"
          />

          <AuthButton onPress={handleSignup} text="Sign up" iconButton="verified" />
        
          <RightClickableText route="LoginScreen" navigation={navigation} text="Login" />
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignupScreen
