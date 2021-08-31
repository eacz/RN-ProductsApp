import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Keyboard } from 'react-native'
import { View, Text, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Background from '../components/Background'
import WhiteLogo from '../components/WhiteLogo'
import useForm from '../hooks/useForm'
import loginStyles from '../theme/loginTheme'

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
          {/* TODO: make a field component */}
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
            onChangeText={(value) => onChange(value, 'email')}
            onSubmitEditing={handleLogin}
            value={email}
          />
          <Text style={loginStyles.label} >Password</Text>
          <TextInput 
            placeholder="Write your password"
            secureTextEntry
            underlineColorAndroid="#ffffff" 
            placeholderTextColor="rgba(255,255,255,0.4)"  
            style={[loginStyles.inputField, (Platform.OS ==="ios") && loginStyles.inputFieldIos]}
            selectionColor="#ffffff"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(value) => onChange(value, 'password')}
            onSubmitEditing={handleLogin}
            value={password}
          />

          <View style={loginStyles.buttonContainer} >
            <TouchableOpacity onPress={handleLogin} style={loginStyles.button} activeOpacity={0.8} >
              <Text style={loginStyles.buttonText} >Login</Text>
            </TouchableOpacity>
          </View>
          {/* I can easily make a component of this too */}
          <View style={loginStyles.newUserContainer} >  
            <TouchableOpacity 
              onPress={() => navigation.replace('SignupScreen')} 
              activeOpacity={0.8} 
            >
                <Text style={loginStyles.buttonText} > New Account </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default LoginScreen
